import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Predict = () => {
  const [status, setStatus] = useState('');
  const [emailStatus, setEmailStatus] = useState([]);

  const checkSpamEmails = async () => {
    try {
      const response = await axios.get('http://192.168.0.112:5000/check_spam_emails');
      setStatus('Server response received'); // Update status
      setEmailStatus(response.data.emails); // Update email statuses
    } catch (error) {
      console.error('Error checking spam emails:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Status: {status}</Text> 
      <Button title="Check Spam Emails" onPress={checkSpamEmails} />


      {emailStatus.length > 0 &&
        <View style={styles.emailContainer}>
          <Text style={styles.emailHeader}>Email Statuses:</Text>
          <View style={styles.emailList}>
            {emailStatus.map((email, index) => (
              <View style={styles.cont}>
                <View key={index} style={styles.emailItem}>
                  <Text style={styles.subject}>Subject: {email.subject}</Text>
                  <Text style={styles.sender}>Sender: {email.sender}</Text>
                  <Text style={styles.body}>Body: {email.body}</Text>
                  <Text style={styles.spam}>{email.isSpam ? 'Spam detected' : 'Not spam'}</Text>
                </View>
            </View>
          ))}
        </View>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailContainer: {
    marginTop: 20,
  },
  emailHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emailItem: {
    marginBottom: 20,
    width: '50%',
    backgroundColor: '#f2f2f2',
  },
  subject: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sender: {
    fontSize: 14,
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    marginBottom: 5,
  },
  spam: {
    fontSize: 14,
    color: 'red',
  },
});

export default Predict;
