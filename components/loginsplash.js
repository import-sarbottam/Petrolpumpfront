import { StyleSheet,TextInput, View,StatusBar,Platform,Text,Pressable,Image } from 'react-native';
import React, { useState } from 'react';

export default function LoginSplash(){
    return(
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00040D',
      // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      borderWidth: 10,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      textDecorationStyle:'dotted',
    },
});