import axios from 'axios';
import React, {useContext} from 'react';
import { StyleSheet, Text, View,Image, Pressable } from 'react-native';
import { NativeModules } from "react-native";
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {

  const {dispatch} = useContext(AuthContext)

    async function logout(){
      try {
        const res = await axios.get('https://ptrlpump-backend.herokuapp.com/api/logout/')
        dispatch({ type: "LOGOUT" });
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
      <View style={styles.topcontainer}>
        <Text style={styles.TextStyle}>Petrol Pump Sales</Text>
        <Pressable onPress={()=>logout()}>
          <Image
            source={require('../assets/logout.png')}
            style={styles.tinyLogo}
          />
        </Pressable>
        {/* <Text>TopBar</Text>
        <Text>Right</Text> */}
      </View>
    );
  }

const styles = StyleSheet.create({
  topcontainer: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: '#282b2e',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  TextStyle: {
    fontSize: 16,
    color: '#fff',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    backgroundColor:'#282b2e'
  },
});