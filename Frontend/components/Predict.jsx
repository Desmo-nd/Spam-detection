import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { SIZES } from '../constants';

const Predict = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const predictSpam = async () => {
    const response = await fetch('http://192.168.0.109:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button title="Predict" onPress={predictSpam} />
      {result ? <Text style={styles.result}>{`Result: ${result}`}</Text> : null}
    </View>
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
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Predict;
