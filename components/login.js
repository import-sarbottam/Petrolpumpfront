import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Platform,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [alertMessage, setAlertMessage] = useState("");
  const [Id, setID] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Visibility, setVisibility] = useState(true);

  const [Icon, setIcon] = useState(
    <Image source={require("../assets/eye.png")} style={styles.tinyLogo} />
  );
  const { isFetching, dispatch } = useContext(AuthContext);

  const SetAlert = (e) => {
    setAlertMessage(e);
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  };

  async function logincall() {
    if (!Password) {
      SetAlert("No Password Given!");
      return;
    }

    if (!Id) {
      SetAlert("No Username Given!");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://ptrlpump-backend.herokuapp.com/api/login/",
        {
          username: Id,
          password: Password,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      SetAlert("Wrong Username or Password");
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  }

  function handleVisibility() {
    if (Visibility) {
      setVisibility(false);
      setIcon(
        <Image
          source={require("../assets/hideye.png")}
          style={styles.tinyLogo}
        />
      );
    } else {
      setVisibility(true);
      setIcon(
        <Image source={require("../assets/eye.png")} style={styles.tinyLogo} />
      );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={false} backgroundColor="#00040D" />
      <Text style={styles.TextStyle}>Login To Your Account</Text>
      <TextInput
        autoComplete="username"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setID}
        placeholder="Username"
        placeholderTextColor="#fff"
      />
      <View style={styles.passwordfield}>
        <TextInput
          autoComplete="password"
          autoCapitalize="none"
          secureTextEntry={Visibility}
          style={[styles.input, { borderWidth: 0, margin: 0 }]}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#fff"
        />
        <Pressable onPress={() => handleVisibility()}>{Icon}</Pressable>
      </View>

      <Pressable
        onPress={() => logincall()}
        style={[styles.pressablestyle, { borderColor: "#0088ff" }]}
      >
        {isFetching? (<Text style={[{ color: "#0088ff", fontSize: 12 }]}>Please Wait</Text>):
        (<Text style={[{ color: "#0088ff", fontSize: 16 }]}>Sign In</Text>)}
        
      </Pressable>

      {alertMessage ? (
        <View>
          <Text style={{ color: "#ed6d65", fontSize: 18 }}>{alertMessage}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00040D",
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderWidth: 10,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    textDecorationStyle: "dotted",
  },

  TextStyle: {
    fontSize: 16,
    color: "#fff",
    margin: 8,
  },
  input: {
    height: 60,
    width: "85%",
    margin: 7,
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  pressablestyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 60,
    borderWidth: 1,
    borderColor: "white",
    padding: 13,
    margin: 10,
    borderRadius: 15,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    backgroundColor: "#00040D",
    marginRight: 25,
    marginTop: 15,
  },
  passwordfield: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    margin: 8,
    justifyContent: "space-between",
    maxWidth: "85%",
    minWidth: "85%",
    minHeight: 60,
    maxHeight: 60,
  },
});
