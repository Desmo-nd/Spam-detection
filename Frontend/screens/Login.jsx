import React from "react";
import {Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./auth.styles";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../constants";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['rgba(255, 254, 230, 0.7)', 'rgba(6, 66, 66, 0.2)']}            
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
      >   
        <LinearGradient
          colors={['rgba(255, 254, 230, 0.7)', 'rgba(255, 254, 230, 0.7)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0 }}
          style={styles.innerContainer}
          >   
      <Text style={styles.title}>Log In</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10, flexDirection:"row"}}>
        <Text style={{marginTop: 0}}> Don't have an account? </Text>
        <TouchableOpacity 
            onPress={() => navigation.navigate('Signup')}  
        >
          <Text style={{color: COLORS.red}}> Sign Up</Text>
        </TouchableOpacity>
        
      </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default Login;
