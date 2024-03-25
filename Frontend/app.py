from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import imaplib
import email
from email.header import decode_header
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Load the trained model and vectorizer
loaded_model = joblib.load('email_spam_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# IMAP configuration
imap_server = 'imap.gmail.com'
imap_port = 993
username = 'mwrgdesmond@gmail.com'
password = 'zolb fgjb vksq ospq'

def check_spam_emails():
    # Connect to the IMAP server
    imap_conn = imaplib.IMAP4_SSL(imap_server, imap_port)

    # Login to the server
    imap_conn.login(username, password)

    # Select the mailbox you want to fetch emails from (e.g., 'INBOX')
    mailbox = 'INBOX'
    status, messages = imap_conn.select(mailbox)

    # Check if the mailbox selection was successful
    if status != 'OK':
        print(f'Error selecting mailbox {mailbox}: {messages}')
        exit()

    # Get today's date in the format required by IMAP search
    today = datetime.now().strftime("%d-%b-%Y")

    # Search for emails received on today's date
    status, search_result = imap_conn.search(None, f'(SINCE "{today}")')

    # Check if search was successful
    if status != 'OK':
        print(f'Error searching for emails: {search_result}')
        exit()

    # Fetch the list of email IDs
    email_ids = search_result[0].split()

    email_statuses = []  # List to store email statuses

    # Iterate through each email
    for email_id in email_ids:
        # Fetch the email data
        status, email_data = imap_conn.fetch(email_id, '(RFC822)')

        # Check if fetch was successful
        if status != 'OK':
            print(f'Error fetching email {email_id}: {email_data}')
            continue

        # Parse the email data
        raw_email = email_data[0][1]
        parsed_email = email.message_from_bytes(raw_email)

        # Extract email subject, sender, and date
        subject = decode_header(parsed_email['Subject'])[0][0]
        # Convert bytes object to string
        subject = subject.decode() if isinstance(subject, bytes) else subject
        sender = parsed_email.get('From')
        date = parsed_email.get('Date')

        # Extract plain text message body
        message_body = ""
        if parsed_email.is_multipart():
            for part in parsed_email.walk():
                content_type = part.get_content_type()
                if content_type == 'text/plain':
                    message_body += part.get_payload(decode=True).decode('utf-8', errors='ignore')
        else:
            message_body = parsed_email.get_payload(decode=True).decode('utf-8', errors='ignore')

        # Perform spam detection
        new_email = [message_body]
        new_email = vectorizer.transform(new_email)
        prediction = loaded_model.predict(new_email)
        is_spam = prediction[0] == "spam"

        # Append email status to the list
        email_statuses.append({
            'subject': subject,
            'sender': sender,  
            'body': message_body,
            'isSpam': is_spam
        })

    imap_conn.logout()

    return {'status': 'Success', 'code': 200, 'emails': email_statuses}


@app.route('/check_spam_emails', methods=['GET'])
def trigger_spam_check():
    response_data = check_spam_emails()
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
