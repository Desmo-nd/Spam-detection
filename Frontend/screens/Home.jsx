import React from 'react';
import { SafeAreaView, StyleSheet  } from 'react-native';
import { Predict, Welcome } from '../components';
import { SIZES } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  return (
    <SafeAreaView>
       <LinearGradient colors={['rgba(255, 254, 230, 0.7)', 'rgba(6, 66, 66, 0.2)']}            
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0 }} 
        >
          <ScrollView style={styles.container}>
            <Welcome/>
            <Predict/>     
          </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    width:SIZES.width,
    height:SIZES.height,
  }
});
export default Home;
