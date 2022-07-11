import { StyleSheet, View,StatusBar,Text, Pressable,FlatList } from 'react-native';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TopBar from './topbar';

export default function Entryview(){
  const [Entry, setEntry] = useState([])
  const [Inputbox, setInputbox] = useState(false)
  const [Amount, setAmount] = useState(null)
  const [Quantity, setQuantity] = useState(null)
  const [Item, setItem] = useState(null);
  const [Party, setParty] = useState(null);
  const [Slip, setSlip] = useState(null)
  const [Vehicle, setVehicle] = useState(null)
  const [Date, setDate] = useState(null)

  useEffect(() => {
    async function getEntry(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/entryshift/')
        if(user.data)
          setEntry(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEntry()
  }, [])

  function handlePress(e){
    setInputbox(true)
    setAmount(e.amt)
    setDate(e.date)
    setItem(e.item)
    setParty(e.party_name)
    setSlip(e.slip_no)
    setVehicle(e.vehicle_no)
    setQuantity(e.litre)
  }

  return(
    <View style={styles.container}>
      <StatusBar animated={false} backgroundColor="#00040D" />
      <View style={[{alignItems:'flex-start',
                    justifyContent:'flex-start',
                    alignSelf:'stretch',
                    borderWidth:0, paddingTop:0,marginTop:0
      }]}>
        <TopBar/>
      </View>
      {Inputbox ? (
        <View style={[styles.container,{justifyContent:'center'}]}>
            <Text style={styles.TextStyle}>Slip Details</Text>
            <Text style={styles.TextStyle}>Date: {Date}</Text>
            <Text style={styles.TextStyle}>Slip No: {Slip}</Text>
            <Text style={styles.TextStyle}>Party: {Party}</Text>
            <Text style={styles.TextStyle}>Vehicle No: {Vehicle}</Text>
            <Text style={styles.TextStyle}>Item: {Item}</Text>
            <Text style={styles.TextStyle}>Quantity: {Quantity}</Text>
            <Text style={styles.TextStyle}>Amount: {Amount}</Text>
          <View style={{flexDirection:'row'}}>
          <Pressable onPress={()=>setInputbox(false)} style={[styles.pressablestyleinput,{borderColor:'#d11111'}]}>
            <Text style={[{color:'#d11111',fontSize:14}]}>Return</Text>
          </Pressable>
          </View> 
        </View>
      ) :
      <FlatList
        data={Entry}
        renderItem={(e) => {
        return (
          <Pressable onPress={()=> handlePress(e.item)}>
            <View style={{flexDirection:'row',borderWidth:1,borderColor:'white',borderRadius:15,margin:8,justifyContent:'space-between',maxWidth:'95%',minWidth:'95%'}}>
                <Text style = {[styles.TextStyle,{fontSize:16,padding:15,flexShrink:1,flexWrap:'wrap'}]}>{e.item.slip_no}</Text>
            </View>
          </Pressable>
        );
        }}
        keyExtractor={item => item.slip_no}
        showsHorizontalScrollIndicator={false}
      />
      }
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
    fontSize: 20,
    color: '#fff',
    margin: 8
  },
  tinyLogo: {
    width: 30,
    height: 35,
    backgroundColor:'#00040D',
    marginRight: 45
  },
  pressablestyle:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'65%',
    height:65,
    flexDirection: "row",
    borderWidth:1,
    borderColor:'red',
    padding:10,
    margin: 8,
    borderRadius:25
  },
  input: {
    minHeight: 45,
    minWidth: '85%',
    margin: 9,
    borderWidth: 1,
    borderColor:"white",
    padding: 10,
    color: '#fff',
    borderRadius: 15,
  },
  pressablestyleinput:{
    alignItems: 'center',
    justifyContent: 'center',
    minWidth:'25%',
    minHeight:45,
    borderWidth:1,
    borderColor:'white',
    padding:10,
    margin: 10,
    borderRadius:15
  }
});