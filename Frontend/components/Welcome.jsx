import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = () => {
  return (
    <LinearGradient colors={['rgba(255, 254, 230, 0.7)', 'rgba(6, 66, 66, 0.2)']}            
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0 }} 
        style={styles.container}
        >
      <View style={styles.welcomeCont}>
        <View style={styles.header}>
            <Text style={styles.title}>Welcome to Spam Detection</Text>
            <Text style={styles.subtitle}>Protect your inbox from <Text style={{color:COLORS.red}}>unwanted </Text>emails</Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 26,
    fontFamily: 'semibold',
    color: '#666',
    marginTop: -10,
  },
  description: {
    width: '80%',
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
});

export default Welcome;
