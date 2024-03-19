from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Load the trained model
loaded_model = joblib.load('email_spam_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    new_email = [data['email']]
    new_email = vectorizer.transform(new_email)
    prediction = loaded_model.predict(new_email)
    if prediction[0] == "spam":
        return jsonify({'result': 'spam'})
    else:
        return jsonify({'result': 'not spam'})

if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)

    app.run(host='0.0.0.0', port=5000)






# import imaplib
# import email
# from email.header import decode_header
# from datetime import datetime, timedelta

# # IMAP server settings (for Gmail)
# imap_server = 'imap.gmail.com'
# imap_port = 993
# username = 'mwrgdesmond@gmail.com'  # Update with your Gmail email address
# password = 'zolb fgjb vksq ospq'  # Update with your Gmail password

# # Connect to the IMAP server
# imap_conn = imaplib.IMAP4_SSL(imap_server, imap_port)

# # Login to the server
# imap_conn.login(username, password)

# # Select the mailbox you want to fetch emails from (e.g., 'INBOX')
# mailbox = 'INBOX'
# status, messages = imap_conn.select(mailbox)

# # Check if the mailbox selection was successful
# if status != 'OK':
#     print(f'Error selecting mailbox {mailbox}: {messages}')
#     exit()

# # Get today's date in the format required by IMAP search
# today = (datetime.now() - timedelta(1)).strftime("%d-%b-%Y")

# # Search for emails received on today's date
# status, search_result = imap_conn.search(None, f'(SINCE "{today}")')

# # Check if search was successful
# if status != 'OK':
#     print(f'Error searching for emails: {search_result}')
#     exit()

# # Fetch the list of email IDs
# email_ids = search_result[0].split()

# # Iterate through each email
# for email_id in email_ids:
#     # Fetch the email data
#     status, email_data = imap_conn.fetch(email_id, '(RFC822)')

#     # Check if fetch was successful
#     if status != 'OK':
#         print(f'Error fetching email {email_id}: {email_data}')
#         continue

#     # Parse the email data
#     raw_email = email_data[0][1]
#     parsed_email = email.message_from_bytes(raw_email)

#     # Extract email subject, sender, and date
#     subject = decode_header(parsed_email['Subject'])[0][0]
#     sender = parsed_email.get('From')
#     date = parsed_email.get('Date')

#     # Extract plain text message body
#     message_body = ""
#     if parsed_email.is_multipart():
#         for part in parsed_email.walk():
#             content_type = part.get_content_type()
#             if content_type == 'text/plain':
#                 message_body += part.get_payload(decode=True).decode('utf-8', errors='ignore')
#     else:
#         message_body = parsed_email.get_payload(decode=True).decode('utf-8', errors='ignore')

#     # Display email information and message body
#     print(f'Subject: {subject}')
#     print(f'Sender: {sender}')
#     print(f'Date: {date}')
#     print(f'Message Body:\n{message_body}\n')
#     print('---')

# # Logout from the server
# imap_conn.logout()
