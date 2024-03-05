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
