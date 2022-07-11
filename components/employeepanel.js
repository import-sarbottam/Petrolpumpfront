import React from "react";
import { View, Text, StyleSheet,StatusBar, Pressable,Image } from "react-native";
import TopBar from "./topbar";

export default function EmployeePanel({navigation}) {

  return (
    <View style={styles.container}>
      <View style={[{flex:0.56,
                    alignItems:'flex-start',
                    justifyContent:'flex-start',
                    alignSelf:'stretch',
                    borderWidth:0, paddingTop:0,marginTop:0
            }]}>
        <TopBar/>
      </View>
      <Pressable style={styles.pressablestyle}
      onPress = {()=>navigation.navigate('EmployeeForm')}
      >
        <Image
          source={require('../assets/add.png')}
          style={styles.tinyLogo}
        />
        <Text style = {styles.TextStyle}>Add Entry</Text>
      </Pressable>
      <Pressable
       style={styles.pressablestyle}
       onPress = {()=>navigation.navigate('EntryView')}>
        <Image
          source={require('../assets/view.png')}
          style={[styles.tinyLogo]}
        />
        <Text style = {styles.TextStyle}>View Entries</Text>
      </Pressable>
    </View>
  );
}

// Just some styles
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
    height: 30,
    backgroundColor:'#00040D',
    marginRight: 45
  },
  pressablestyle:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    height:'15%',
    flexDirection: "row",
    borderWidth:1,
    borderColor:'#00a0fc',
    padding:20,
    margin: 8,
    borderRadius:25
  }
});