import React from "react";
import {TouchableOpacity, View, Text, SafeAreaView, TextInput, StatusBar } from "react-native";
import styles from "./auth.styles";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { Alert } from "react-native";
import { COLORS } from "../constants";
import  {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";
import * as Yup from "yup";   
import {Formik} from "formik";  
import { useState } from "react";
import BtnSignup from "../components/BtnSignup";


const validationSchema = Yup.object().shape({

  password: Yup.string()
    .min(8, 'Passwod must be at least 8 characters')
    .required('Required'),
  email: Yup.string()
      .email('provide a valid email address')
      .required('Required'),    
  username: Yup.string()
      .min(3, 'Provide a valid username')
      .required('Required'),   
});


const Signup = ({navigation}) => {
  const [loader, setLoader] = useState(false);
    const [obsecureText, setObsequireText] = useState(false);
 

    const inValidForm = () => {
        Alert.alert(
          "Invalid Form",
          "Please provide all required fields?",
          [
            {
              text: "Cancel", onPress: () => ({}),
            },
            {
              text: "Continue", onPress: () => ({}),
            },
          ]
        )
    };

    const registerUser = async (values) => {
      setLoader(true);
  
      try{
          const endpoint ="http://192.168.0.109:3000/api/register";
          const data = values;
  
          const response = await axios.post(endpoint, data);
          if(response.status === 201){
             navigation.replace('Login')
  
          }
      }catch(error){
          console.log(error)
      }
    };
  


  return (
    <LinearGradient
      colors={['#FFFFFF', '#ADD8E6']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
      >   
        <Formik
          initialValues={{email: "", password: "", username: ""}}
          validationSchema={validationSchema}
          onSubmit={values => registerUser(values)}
        >

          {({ 
              handleChange,
              handleSubmit, 
              touched, 
              values, 
              errors, 
              isValid, 
              setFieldTouched 
          }) => (
              <LinearGradient
                colors={['#ADD8E6','#FFFFFF']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.innerContainer}
                >   
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View style={[styles.inputWrapper, { borderColor: touched.username ? COLORS.secondary : COLORS.offwhite }]}>                      
                    <MaterialCommunityIcons
                          name="face-man-profile"  
                          size={24}
                          color={COLORS.gray}
                          style={styles.iconStye}

                      />

                      <TextInput
                          placeholder="Username"
                          onFocus={() => {setFieldTouched('username')}}
                          onBlur={()=> {setFieldTouched('username', "")}}
                          value={values.username}
                          onChangeText={handleChange("username")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex:1, fontSize: 18}}
                      />
                  </View>
                  {touched.username && errors.username && (
                      <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>
                {/* <TextInput placeholder="Email" style={styles.input} /> */}
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View 
                    style={[styles.inputWrapper, 
                      { borderColor: touched.username ? COLORS.secondary : COLORS.offwhite }]}>                      
                      <MaterialCommunityIcons
                          name="email-outline"  
                          size={24}
                          color={COLORS.gray}
                          style={styles.iconStye}

                      />

                      <TextInput
                          placeholder="Enter your email"
                          onFocus={() => {setFieldTouched('email')}}
                          onBlur={()=> {setFieldTouched('email', "")}}
                          value={values.email}
                          onChangeText={handleChange("email")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex:1, fontSize: 18}}
                      />
                  </View>
                  {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                {/* <TextInput placeholder="Password" style={styles.input} secureTextEntry /> */}
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputWrapper, { borderColor: touched.username ? COLORS.secondary : COLORS.offwhite }]}>                      
                    <MaterialCommunityIcons
                          name="lock-outline"  
                          size={24}
                          color={COLORS.gray}
                          style={styles.iconStye}

                      />

                      <TextInput
                          secureTextEntry={obsecureText}
                          placeholder="Password"
                          onFocus={() => {setFieldTouched('password')}}
                          onBlur={()=> {setFieldTouched('password', "")}}
                          value={values.password}
                          onChangeText={handleChange("password")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex:1, fontSize: 18}}
                      />

                      <TouchableOpacity onPress={() => setObsequireText(!obsecureText)}>                                          
                          <MaterialCommunityIcons 
                              name={obsecureText? "eye-outline" : "eye-off-outline"}
                              size={18}
                          />
                      </TouchableOpacity>

                  </View>
                  {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}

                </View>

                <View style={styles.bottom}>
                  <BtnSignup 
                      title={"S I G N U P"} 
                      onPress={isValid ?handleSubmit: inValidForm} 
                      loader={loader}
                      isValid={isValid}
                      style={{backgroundColor:COLORS.red}}
                  /> 
                </View>
              </LinearGradient>
         )}
         </Formik>
    </LinearGradient>
  );
};

export default Signup;
