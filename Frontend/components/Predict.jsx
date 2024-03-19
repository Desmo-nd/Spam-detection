import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { SIZES } from '../constants';
import Button from './Button';
import { LinearGradient } from 'expo-linear-gradient';

const Predict = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const predictSpam = async () => {
    const response = await fetch('http://192.168.0.112:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    // alert(`Result: ${data.result}`);
    setResult(data.result);
    };

  return (
    <LinearGradient colors={['rgba(255, 254, 230, 0.7)', 'rgba(6, 66, 66, 0.2)']}            
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0 }} 
        style={styles.container}
        >
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="grey"
        onChangeText={text => setEmail(text)}
        value={email}
        multiline
        numberOfLines={6}
      />
      <Button style={styles.btn} title="Predict" onPress={predictSpam} />
      {result ? <Text style={styles.result}>{`Result: ${result}`}</Text> : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    paddingVertical: 10,
    fontFamily: 'semibold',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 19,
    fontFamily: 'bold',
    color: 'green',
  },
  btn: {
    width: '100%',
  },
});

export default Predict;
