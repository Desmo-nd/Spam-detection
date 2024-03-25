import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../constants';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
          <Text style={{color: COLORS.primary, fontSize: 20, fontWeight: 'bold'}}>
              Spam Detection
          </Text>
      </View>
      <View style={styles.welcomeCont}>
        <View style={styles.header}>
            <Text style={styles.title}>AI-based Platform</Text>
            <Text style={styles.title}>to Increase Your</Text>
            <Text style={styles.subtitle}>Email Deliverability.</Text>
            <Text style={styles.description}>
                Spam Detection uses advanced machine learning algorithms to analyze emails and 
                determine if they are spam or not. Simply enter an email below to check its spam score.
            </Text>
        </View>
        <View>
          <Image
            source={require('../assets/trash.png')}
            style={{
              width: 400,
              height: 400,
            }}
          />
        </View>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height*0.5,
    padding: 20,


    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    width: "95%",
    height: 30,
    marginHorizontal:'3%',
    marginTop: SIZES.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  welcomeCont: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },    
  header: {
    width: '60%',

   },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: 'semibold',
    color: 'blue',
    marginTop: -10,
  },
  description: {
    width: '80%',
    fontSize: 15,
    color: '#000',
    marginTop: 10,
  },
});

export default Welcome;
