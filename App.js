import React, { useState,useEffect,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminPanel from './components/adminpanel';
import AdminPrice from './components/adminprice';
import EmployeeForm from './components/employeeform';
import Partyviewer from './components/party';
import ChangeEmpPassword from './components/Changepass';
import ChangeAdPassword from './components/Changeadminpass';
import EmployeePanel from './components/employeepanel';
import Entryview from './components/viewentry';
import Login from './components/login';
import LoginSplash from './components/loginsplash';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [User, setUser] = useState(null)
  useEffect(() => {
    async function getUser(){
      try {
        const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/getuser/')
        if(user.data)
          setUser(user.data.user)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const { user } = useContext(AuthContext);
  console.log(user)
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        {User?(
          User.shift==='zero'?(
            <>
              <Stack.Screen name="Admin" component={AdminPanel} />
              <Stack.Screen name="Adminprice" component={AdminPrice} />
              <Stack.Screen name="PartyView" component={Partyviewer} />
              <Stack.Screen name="Employeepass" component={ChangeEmpPassword} />
              <Stack.Screen name="Adminpass" component={ChangeAdPassword} />
            </>
          ) : (
            <>
              <Stack.Screen name="EmployeePanel" component={EmployeePanel} />
              <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
              <Stack.Screen name="EntryView" component={Entryview} />
            </>
          ) 
        ):(
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginSplash" component={LoginSplash} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}