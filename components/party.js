import { StyleSheet,TextInput, View,StatusBar,Platform,Text, Pressable,Image,FlatList,Alert } from 'react-native';
import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import TopBar from './topbar';
import { AuthContext } from '../context/AuthContext';

export default function Partyviewer(){
  const [Party, setParty] = useState([])
  const [Count, setCount] = useState(0)
  const [Inputbox, setInputbox] = useState(false)
  const [Partyname, setPartyname] = useState(null)
  const {user,token} = useContext(AuthContext)

  useEffect(() => {
    async function getParty(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/party/')
        if(user.data)
          setParty(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    getParty()
  }, [Count])

  function deleteAlert(id,name){
    Alert.alert(
      "",
      `Are you sure you want to delete ${name} ?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log('cancelled'),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete(id) }
      ]
    );
  }

  async function handleDelete(id){

    axios.defaults.headers.common['Authorization'] = 'Token ' + token

    await axios.delete(`https://ptrlpump-backend.herokuapp.com/api/deleteparty/${id}`).then((result) => {
      setCount(Count+1)
    }).catch((err) => {
      console.log(err)
    });
  }

  async function handleSubmit(){
    
    axios.defaults.headers.common['Authorization'] = 'Token ' + token

    await axios.post('https://ptrlpump-backend.herokuapp.com/api/postparty/',{
      "company": user.company,
      "party_name": Partyname,
      "owner": user.username,
    }).then((response) => {
      if(response.status===201){
        setCount(Count+1)
        setInputbox(false)
        setPartyname(null)
      }
    }).catch((err) => {
      console.log(err)
    });
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
      <Pressable onPress={()=>{setInputbox(true)}} style={styles.pressablestyle}>
        <Image
          source={require('../assets/addparty.png')}
          style={styles.tinyLogo}
        />
        <Text style = {[styles.TextStyle,{fontSize:16}]}>Add Party</Text>
      </Pressable>
      {Inputbox ? (
        <View style={styles.container}>
          <TextInput 
            style={styles.input}
            value = {Partyname}
            onChangeText = {setPartyname}
            placeholder = "Enter the party name"
            placeholderTextColor = '#fff'
          />
          <View style={{flexDirection:'row'}}>
          <Pressable onPress={()=>setInputbox(false)} style={[styles.pressablestyleinput,{borderColor:'#d11111'}]}>
            <Text style={[styles.TextStyle,{color:'#d11111',fontSize:14}]}>Return</Text>
          </Pressable>
          <Pressable onPress={()=>handleSubmit()} style={[styles.pressablestyleinput,{borderColor:'#0088ff'}]}>
            <Text style={[styles.TextStyle,{color:'#0088ff',fontSize:14}]}>Submit</Text>
          </Pressable>
          </View> 
        </View>
      ) :
      <FlatList
        data={Party}
        renderItem={(e) => {
        return (
          <View style={{flexDirection:'row',borderWidth:1,borderColor:'white',borderRadius:15,margin:8,justifyContent:'space-between',maxWidth:'95%',minWidth:'95%'}}>
            <Text style = {[styles.TextStyle,{fontSize:16,padding:15,flexShrink:1,flexWrap:'wrap'}]}>{e.item.party_name}</Text>
            <Pressable onPress={()=>deleteAlert(e.item.id,e.item.party_name)}>
            <Image
              source={require('../assets/removeparty.png')}
              style={[styles.tinyLogo,{marginTop:10}]}
            />
            </Pressable>
          </View>
        );
        }}
        keyExtractor={item => item.id}
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