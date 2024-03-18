import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Predict, Welcome } from '../components';
import { SIZES } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <SafeAreaView>
        <LinearGradient colors={['rgba(255, 254, 230, 0.7)', 'rgba(6, 66, 66, 0.2)']}            
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0 }} 
            style={{height:SIZES.height}}
            >
            <View >
                <Welcome/>
                <Predict/>
            </View>
        </LinearGradient>
    </SafeA
    
    
    reaView>
  );
};

export default Home;
