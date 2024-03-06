import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const SignBtn = ({title, onPress,}) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.btnStyle}
    >
        <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SignBtn

const styles = StyleSheet.create({
   
    btnStyle:{
        height:45,
        width:100,
        marginVertical:SIZES.xSmall,
        backgroundColor:COLORS.red,
        justfyContent:'center',
        alignItems:'center',
        borderRadius:12,
        marginBottom:87,
        
    },

    btnTxt:{
        fontFamily:'bold',
        color:COLORS.secondary,
        fontSize:18,
        marginVertical:10
    },

})