import { StyleSheet,TextInput, View,StatusBar,Platform,Text, Pressable } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TopBar from './topbar';

export default function AdminPrice({navigation}){

  const [Petrol, setPetrol] = useState(null)
  const [Petrolph, setPetrolph] = useState(null) 
  const [Diesel, setDiesel] = useState(null)
  const [Dieselph, setDieselph] = useState(null)
  const [XP, setXP] = useState(null)
  const [XPh, setXPh] = useState(null)
  const [MS, setMS] = useState(null)
  const [MSph, setMSph] = useState(null)
  const [User, setUser] = useState(null)
  const [Token,setToken] = useState(null)
  const [alertMessage, setAlertMessage] = useState("");
  const regExp = /[a-zA-Z]/g;

  useEffect(() => {
    async function getUser(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/getuser/')
        if(user.data)
          setUser(user.data.user)
          setToken(user.data.token)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    async function getPrice(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/price/')
        if(user.data)
          setPetrolph(`Petrol Price | Current set price: ${user.data.p_price}`)
          setDieselph(`Diesel Price | Current set price: ${user.data.d_price}`)
          setXPh(`XP Price | Current set price: ${user.data.xp_price}`)
          setMSph(`Speed Price | Current set price: ${user.data.s_price}`)
      } catch (error) {
          setPetrolph(`Petrol Price | Current set price: 0`)
          setDieselph(`Diesel Price | Current set price: 0`)
          setXPh(`XP Price | Current set price: 0`)
          setMSph(`Speed Price | Current set price: 0`)
      }
    }
    getPrice()
  }, [])

  async function handleSubmit() {
    if(!Petrol || !Diesel){
      SetAlert('Diesel and petrol cannot be blank. Write price as 0 if you donot have it.')
      return;
    }
    if(!XP)
      setXP('0')
    if(!MS)
      setMS('0')
    if(regExp.test(Petrol) || regExp.test(Diesel) || regExp.test(XP) || regExp.test(MS)){
      SetAlert('One or more of the prices contains string. Write price as 0 if you donot have it.')
      return;
    }
    
    axios.defaults.headers.common['Authorization'] = 'Token ' + Token
    await axios.post('https://ptrlpump-backend.herokuapp.com/api/postprice/',{
      "company": User.company,
      "p_price": Petrol,
      "d_price": Diesel,
      "xp_price": XP,
      "s_price": MS,
      "owner": User.username,
    }).then((response) => {
      if(response.status===201){
        navigation.navigate('Admin')
      }
      else{
        SetAlert("Couldnot process your request")
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  function Reset(){
    setPetrol(null)
    setDiesel(null)
    setMS(null)
    setXP(null)
  }

  

  return(
    <View style={styles.container}>
      <StatusBar animated={false} backgroundColor="#00040D" />
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
        value = {Petrol}
        onChangeText = {setPetrol}
        placeholder = {Petrolph}
        placeholderTextColor = '#fff'
      />
      <TextInput 
        style={styles.input}
        value = {Diesel}
        onChangeText = {setDiesel}
        placeholder = {Dieselph}
        placeholderTextColor = '#fff'
      />
      <TextInput 
        style={styles.input}
        value = {XP}
        onChangeText = {setXP}
        placeholder = {XPh}
        placeholderTextColor = '#fff'
      />
      <TextInput 
        style={styles.input}
        value = {MS}
        onChangeText = {setMS}
        placeholder = {MSph}
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
          <Text style={{ color: "#ed6d65", fontSize: 18 }}>
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
      padding:15,
      margin: 10,
      borderRadius:15
    }
});