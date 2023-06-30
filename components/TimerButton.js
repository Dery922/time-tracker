import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';



/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * The TimerButton component is responsible for start our timer count down it takes 4 props which has an onPress
 * function The TimerButton component is being used at TimerForm component or its consumer is TimerForm
 * 
 */


function TimerButton({color,title,small,onPress}) {
    


    return (
      <TouchableOpacity
        style={[styles.button, {borderColor:color}]}
        onPress={onPress}
        >


        <Text 
          style={[styles.buttonText, small ? styles.small : styles.large, {color}]}
        >
         {title}
       </Text>
      </TouchableOpacity>
      
    );
}



const styles = StyleSheet.create({
    button:{
        marginTop:10,
        minWidth:100,
        borderWidth:2,
        borderRadius:20,
        backgroundColor:'lightgreen'
    },
    small:{
        fontSize:14,
        padding:5,
    },
    large:{
        fontSize:16,
        padding:10,
    },
    buttonText:{
        textAlign:'center',
        fontWeight:'bold',
    },
    elapsedTime:{
        fontSize:18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical:10,
    }
})

export default TimerButton;