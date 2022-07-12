import { StyleSheet,TextInput, View,StatusBar,Platform,Text, Pressable } from 'react-native';
import React, { useState,useContext } from 'react';
import axios from 'axios';
import TopBar from './topbar';
import { AuthContext } from '../context/AuthContext';

export default function ChangeAdPassword(){

  const [alertMessage, setAlertMessage] = useState("");
  const [Old, setOld] = useState(null)
  const [New, setNew] = useState(null)
  const [Confirm, setConfirm] = useState(null)
  const {token,dispatch} = useContext(AuthContext)


  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  async function handleSubmit(){
    if(!Old || !New){
      SetAlert('One or more fields are empty!!')
      return
    }
    if(New.length<8){
      SetAlert('New Password Too Short!')
      return
    }
    if(New!==Confirm){
      setAlertMessage("Password must match")
      return
    }

    axios.defaults.headers.common['Authorization'] = 'Token ' + token

    await axios.put(`https://ptrlpump-backend.herokuapp.com/api/changepassword/`,{
      "old_password": Old,
      "new_password": New,
    }).then((response) => {
      if(response.status===200){
        setConfirm(null)
        setOld(null)
        setNew(null)
        dispatch({ type: "LOGOUT" })
      }
    }).catch((err) => {
      SetAlert('Wrong Old Password')
    });

  }

  function Reset(){
    setConfirm(null)
    setOld(null)
    setNew(null)
  }

  return(
    <View style={styles.container}>
      <View style={[{flex:0.56,
                    alignItems:'flex-start',
                    justifyContent:'flex-start',
                    alignSelf:'stretch',
                    borderWidth:0, paddingTop:0,marginTop:0
                  }]}>
        <TopBar/>
      </View>
      <TextInput 
        style={styles.input}
        autoCapitalize='none'
        value = {Old}
        onChangeText = {setOld}
        secureTextEntry = {true}
        placeholder = "Enter Old Password"
        placeholderTextColor = '#fff'
      />
      <TextInput 
        style={styles.input}
        autoCapitalize='none'
        value = {New}
        onChangeText = {setNew}
        secureTextEntry = {true}
        placeholder = "Enter New Password"
        placeholderTextColor = '#fff'
      />
      <TextInput 
        style={styles.input}
        autoCapitalize='none'
        value = {Confirm}
        onChangeText = {setConfirm}
        secureTextEntry = {true}
        placeholder = "Confirm New Password"
        placeholderTextColor = '#fff'
      />
      <View style={{flexDirection:'row'}}>
        <Pressable onPress={()=>Reset()} style={[styles.pressablestyle,{borderColor:'#d11111'}]}>
          <Text style={[styles.TextStyle,{color:'#d11111'}]}>Reset</Text>
        </Pressable>
        <Pressable onPress={()=>handleSubmit()} style={[styles.pressablestyle,{borderColor:'#0088ff'}]}>
          <Text style={[styles.TextStyle,{color:'#0088ff'}]}>Submit</Text>
        </Pressable>  
      </View>
      {alertMessage ? (
        <View>
          <Text style={{ color: "#ed6d65", fontSize: 16 }}>
            {alertMessage}
          </Text>
        </View>
      ) : null}
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
    justifyContent: 'flex-start',
  },

  TextStyle: {
    fontSize: 14,
    color: '#fff',
  },
  input: {
    height: 45,
    width: '85%',
    margin: 9,
    borderWidth: 1,
    borderColor:"white",
    padding: 10,
    color: '#fff',
    borderRadius: 15,
  },
  pressablestyle:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'25%',
    height:50,
    borderWidth:1,
    borderColor:'white',
    padding:12,
    margin: 10,
    borderRadius:15
  }
});