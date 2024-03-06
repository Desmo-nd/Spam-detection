import React from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";
import styles from "./auth.styles";
import { LinearGradient } from 'expo-linear-gradient';

const Signup = () => {
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
          <Text style={styles.title}>Sign Up</Text>
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </LinearGradient>
    </LinearGradient>
  );
};

export default Signup;
