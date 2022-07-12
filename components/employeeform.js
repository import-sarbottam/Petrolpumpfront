import { StyleSheet,TextInput, View,StatusBar,Pressable,Platform,Text,Keyboard } from 'react-native';
import React, { useState,useEffect, useContext } from 'react';
import {Picker} from '@react-native-picker/picker';
import TopBar from './topbar';
import axios from 'axios';
import { LogBox } from 'react-native';
import { AuthContext } from '../context/AuthContext';
LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop']);
LogBox.ignoreAllLogs()

export default function EmployeeForm({navigation}){
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let partynames = []
    let partynameselect = []
    const [PartyPicker, setPartyPicker] = useState([])
    const [Amount, setAmount] = useState(null)
    const [Quantity, setQuantity] = useState(null)
    const [Item, setItem] = useState(null);
    const [Party, setParty] = useState(null);
    const [Slip, setSlip] = useState(null)
    const [Vehicle, setVehicle] = useState(null)
    const [alertMessage, setAlertMessage] = useState("");
    const [Petrol, setPetrol] = useState(null)
    const [Petrolph, setPetrolph] = useState(null) 
    const [Diesel, setDiesel] = useState(null)
    const [Dieselph, setDieselph] = useState(null)
    const [XP, setXP] = useState(null)
    const [XPh, setXPh] = useState(null)
    const [MS, setMS] = useState(null)
    const [MSph, setMSph] = useState(null)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const regExp = /[a-zA-Z]/g;
    const {user,token} = useContext(AuthContext)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setKeyboardStatus(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

    useEffect(() => {
      async function getParty(){
        try {
          const user = await axios.get(`https://ptrlpump-backend.herokuapp.com/api/party/`)
          for(let i = 0;i<user.data.length;i++){
            partynames.push((user.data[i].party_name))   
          }
                
          for(let i =0; i<partynames.length; i++){
            partynameselect.push(<Picker.Item color='black' label={(user.data[i].party_name)} value={(user.data[i].party_name)} />)
          }
          setPartyPicker(partynameselect)
          }catch (error) {
            console.log(error)
          }
      }
      getParty()
    }, [])
    
    const SetAlert = (e) => {
      setAlertMessage(e);
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    };

    async function handleSubmit(){
      if(!Amount || !Quantity || !Item || !Party || !Slip){
        SetAlert('One or more fields are not filled')
        return;
      }
      if(regExp.test(Quantity) || regExp.test(Amount)){
        SetAlert('Amount or Quantity cannot contain letters')
        return;
      }

      axios.defaults.headers.common['Authorization'] = 'Token ' + token

      await axios.post('https://ptrlpump-backend.herokuapp.com/api/postentry/',{
          "slip_no": Slip,
          "company": user.company,
          "vehicle_no": Vehicle,
          "date": date,
          "party_name": Party,
          "item": Item,
          "litre": Quantity,
          "amt": Amount,
          "owner": user.username,
    },).then((response) => {
      if(response.status === 201){
        setSlip(null)
        setAmount(null)
        setParty(null)
        setItem(null)
        setQuantity(null)
        setVehicle(null)
      }
    }).catch((err) => {
      SetAlert('Couldnot process your request')
    });
  }

  function Reset(){
        setSlip(null)
        setAmount(null)
        setParty(null)
        setItem(null)
        setQuantity(null)
        setVehicle(null)
  }

  useEffect(() => {
    async function getPrice(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/price/')
        if(user.data)
            setPetrol(parseFloat(user.data.p_price))
            setDiesel(parseFloat(user.data.d_price))
            setMS(parseFloat(user.data.s_price))
            setXP(parseFloat(user.data.xp_price))
            setPetrolph(`Petrol | current price: ${user.data.p_price}`)
            setDieselph(`Diesel | current price: ${user.data.d_price}`)
            setXPh(`XP | current price: ${user.data.xp_price}`)
            setMSph(`Speed | current price: ${user.data.s_price}`)
      } catch (error) {
            setPetrol(0)
            setDiesel(0)
            setMS(0)
            setXP(0)
            setPetrolph(`Petrol | current price: 0`)
            setDieselph(`Diesel | current price: 0`)
            setXPh(`XP | current price: 0`)
            setMSph(`Speed | current price: 0`)
      }
    }
    getPrice()
  }, [])

  function handleQuant(e){
    setQuantity(e)
    if(!Item)
        return
    if(regExp.test(e)){
        SetAlert('Quantity cannot contain letter!')
        return;
    }
    if(Item==='P'){
        setAmount((parseFloat(e)*Petrol).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setAmount(null)
        }
    }
    if(Item==='D'){
        setAmount((parseFloat(e)*Diesel).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setAmount(null)
        }
    }
    if(Item==='XP'){
        setAmount((parseFloat(e)*XP).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setAmount(null)
        }
    }
    if(Item==='Speed'){
        setAmount((parseFloat(e)*MS).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setAmount(null)
        }
    }
  }

  function handleAmt(e){
    setAmount(e)
    if(!Item)
        return
    if(regExp.test(e)){
        SetAlert('Amount cannot contain letter!')
        return;
    }
    if(Item==='P'){
        setQuantity((parseFloat(e)/Petrol).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setQuantity(null)
        }
    }
    if(Item==='D'){
        setQuantity((parseFloat(e)/Diesel).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setQuantity(null)
        }
    }
    if(Item==='XP'){
        setQuantity((parseFloat(e)/XP).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setQuantity(null)
        }
    }
    if(Item==='Speed'){
        setQuantity((parseFloat(e)/MS).toFixed(2).toString())
        if(Number.isNaN(parseFloat(e)*Petrol)){
            setQuantity(null)
        }
    }
  }
  

    return(
        <View style={styles.container}>
            <StatusBar animated={false} backgroundColor="#00040D" />
            {keyboardStatus? null:
                            <View style={[{flex:0.56,
                                alignItems:'flex-start',
                                justifyContent:'flex-start',
                                alignSelf:'stretch',
                                borderWidth:0, paddingTop:0,marginTop:0
                            }]}>
                                <TopBar/>
                            </View>
            }
            <TextInput
                style={styles.input}
                value = {Vehicle}
                onChangeText = {setVehicle}
                placeholder = "Vehicle No"
                placeholderTextColor = '#fff'
            />
            <TextInput 
                style={styles.input}
                value = {Slip}
                onChangeText = {setSlip}
                placeholder = "Slip No"
                placeholderTextColor = '#fff'
            />
                <View style={styles.pickerbox}>
                  <Text style = {[styles.TextStyle,{paddingTop:22,paddingLeft:10,borderColor:'white',flexShrink:1}]}>{Party}</Text>
                  <Picker
                    selectedValue={Party}
                    style = {styles.picker}
                    mode = 'dialogue'
                    dropdownIconColor='white' 
                    onValueChange={(itemValue, itemIndex) =>
                      setParty(itemValue)
                    }>
                    <Picker.Item color='black' label="Select Party" value={null} />
                    {PartyPicker}  
                  </Picker>
                </View>
            <View style={styles.pickerbox}>
              <Text style = {[styles.TextStyle,{paddingTop:22,paddingLeft:10,borderColor:'white',flexShrink:1}]}>{Item}</Text>
              <Picker
                selectedValue={Item}
                style = {styles.picker}
                mode = 'dialogue'
                dropdownIconColor='white' 
                onValueChange={(itemValue, itemIndex) =>
                  setItem(itemValue)
                }>
                <Picker.Item color='black' label="Select item" value={null} />  
                <Picker.Item color='black' label= {Petrolph} value="P" />
                <Picker.Item color='black' label={Dieselph} value="D" />
                <Picker.Item color='black' label={MSph} value="Speed" />
                <Picker.Item color='black' label={XPh} value="XP" />
              </Picker>
            </View>
                <TextInput 
                    style={styles.input}
                    value = {Quantity}
                    onChangeText = {(e)=>handleQuant(e)}
                    placeholder = "Quantity"
                    placeholderTextColor = '#fff'
                />
                <TextInput 
                    style={styles.input}
                    value = {Amount}
                    onChangeText = {(e)=>handleAmt(e)}
                    placeholder = "Amount"
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
            <View style={styles.alertBox}>
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
      // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      borderWidth: 10,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  
    TextStyle: {
      fontSize: 16,
      color: '#fff',
    },
    input: {
      height: 40,
      width: '85%',
      margin: 8,
      borderWidth: 1,
      borderColor:"white",
      padding: 10,
      color: '#fff',
      borderRadius: 15,
    },
    picker: {
      height:0,
      width:28,
      backgroundColor:"black",
      marginTop:9,
      marginBottom:5,
    },
    alertBox: {
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
    },
    pickerbox:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'white',
        borderRadius:15,
        margin:8,
        justifyContent:'space-between',
        maxWidth:'85%',
        minWidth:'85%',
        minHeight:75,
    },
    pressablestyle:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'25%',
        height:50,
        borderWidth:1,
        borderColor:'white',
        padding:10,
        margin: 10,
        borderRadius:15
    }
  });