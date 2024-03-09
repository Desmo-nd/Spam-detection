import React, {useState}from "react";
import {Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./auth.styles";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../constants";
import { Alert } from "react-native";
import axios from "axios";
import {Formik} from "formik";  
import * as Yup from "yup";   
import  {MaterialCommunityIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BtnSignup from "../components/BtnSignup";

const validationSchema = Yup.object().shape({

  password: Yup.string()
    .min(8, 'Passwod must be at least 8 characters')
    .required('Required'),
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
});

const Login = (props) => {
  const { navigation } = props;
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsequireText] = useState(false);

  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [
        {
          text: "Cancel",
          onPress: () => ({}),
        },
        {
          text: "Continue",
          onPress: () => ({}),
        },
      ]
    );
  };

  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://192.168.0.109:3000/api/login/";
      const data = values;

      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);

        await AsyncStorage.setItem('user' + response.data._id, JSON.stringify(response.data));
        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
        navigation.replace('Home');

      } else {
        Alert.alert(
          "Error logging in",
          "Please provide valid credentials",
          [
            {
              text: "Cancel",
              onPress: () => ({}),
            },
            {
              text: "Continue",
              onPress: () => ({}),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Oops, Error logging in. Try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => ({}),
          },
          {
            text: "Continue",
            onPress: () => ({}),
          },
        ]
      );
      console.log(error);
    } finally {
      setLoader(false);
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
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={values => login(values)}
      >
        {({ handleChange, handleSubmit, touched, values, errors, isValid, setFieldTouched }) => (
          <LinearGradient
            colors={['#ADD8E6','#FFFFFF']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.innerContainer}
            > 
            <Text style={styles.title}>Sign In</Text>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputWrapper, { borderColor: touched.username ? COLORS.secondary : COLORS.offwhite }]}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color={COLORS.gray}
                  style={styles.iconStye}
                />

                <TextInput
                  placeholder="Enter your email"
                  onFocus={() => { setFieldTouched('email') }}
                  onBlur={() => { setFieldTouched('email', "") }}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1, fontSize: 18 }}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
            </View>
            {/* <TextInput placeholder="Email" style={styles.input} /> */}
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
                  secureTextEntry={!obsecureText}
                  placeholder="Password"
                  onFocus={() => { setFieldTouched('password') }}
                  onBlur={() => { setFieldTouched('password', "") }}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1, fontSize: 18 }}
                />

                <TouchableOpacity onPress={() => setObsequireText(!obsecureText)}>
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-outline" : "eye-off-outline"}
                    size={18}
                  />
                </TouchableOpacity>

              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
            </View>
            {/* <TextInput placeholder="Password" style={styles.input} secureTextEntry /> */}
            <BtnSignup
              loader={loader}
              title={"L O G I N"}
              onPress={isValid ? handleSubmit : inValidForm}
              isValid={isValid}
            />

            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Text style={{ marginTop: 0 }}> Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={{ color: COLORS.red }}> Sign Up</Text>
              </TouchableOpacity>

            </View>
          </LinearGradient>
        )}
      </Formik>
    </LinearGradient>
  );
};

export default Login;