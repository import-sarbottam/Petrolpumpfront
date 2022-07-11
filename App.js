import React from "react";

import { AuthContextProvider } from "./context/AuthContext";
import NavigatorContainer from "./NavigatorContainer";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigatorContainer />
    </AuthContextProvider>
  );
}
