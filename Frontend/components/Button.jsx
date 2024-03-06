import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Button = ({title, onPress,}) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.btnStyle}
    >
        <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
   
    btnStyle:{
        height:45,
        width:'93%',
        marginVertical:SIZES.xSmall,
        marginHorizontal:'3.5%',
        backgroundColor:COLORS.primary,
        justfyContent:'center',
        alignItems:'center',
        borderRadius:12,
        marginBottom:40
    },

    btnTxt:{
        fontFamily:'bold',
        color:COLORS.secondary,
        fontSize:18,
        marginVertical:10
    },

})