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

# # IMAP server settings (for Gmail)
# imap_server = 'imap.gmail.com'
# imap_port = 993
# username = 'your_email@gmail.com'  # Update with your Gmail email address
# password = 'your_password'  # Update with your Gmail password

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

# # Search for unseen emails
# status, search_result = imap_conn.search(None, 'UNSEEN')

# # Check if search was successful
# if status != 'OK':
#     print(f'Error searching for unread emails: {search_result}')
#     exit()

# # Fetch the latest unseen email
# latest_email = search_result[0].split()[-1]
# status, email_data = imap_conn.fetch(latest_email, '(RFC822)')

# # Check if fetch was successful
# if status != 'OK':
#     print(f'Error fetching email {latest_email}: {email_data}')
#     exit()

# # Parse the email data
# raw_email = email_data[0][1]
# parsed_email = email.message_from_bytes(raw_email)

# # Extract email subject and sender
# subject = decode_header(parsed_email['Subject'])[0][0]
# sender = parsed_email['From']

# # Display the email information
# print(f'Subject: {subject}')
# print(f'Sender: {sender}')

# # Logout from the server
# imap_conn.logout()
