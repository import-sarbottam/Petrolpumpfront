import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminPanel from "./components/adminpanel";
import AdminPrice from "./components/adminprice";
import EmployeeForm from "./components/employeeform";
import Partyviewer from "./components/party";
import ChangeEmpPassword from "./components/Changepass";
import ChangeAdPassword from "./components/Changeadminpass";
import EmployeePanel from "./components/employeepanel";
import Entryview from "./components/viewentry";
import Login from "./components/login";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

const Stack = createNativeStackNavigator();

const NavigatorContainer = () => {
  const {dispatch} = useContext(AuthContext)

    useEffect(() => {
      async function getUser() {
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.get(
            "https://ptrlpump-backend.herokuapp.com/api/getuser/"
          );
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE" });
        }
      }
      getUser();
    }, []);

  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        {user ? (
          user.shift === "zero" ? (
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
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainer;
