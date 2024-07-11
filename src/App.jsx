import { Route, Routes } from "react-router";

import "./App.css";

import { AuthProvider } from "./auth/auth-provider";
import AuthGuard from "./auth/guard/auth-guard";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { MainContextProvider } from "./context/main-context-provider";
import NavigationLayout from "./Components/Layouts/NavigationLayout";

function App() {
  return (
    <AuthProvider>
      <NavigationLayout>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route
            path="/dashboard"
            element={
              <MainContextProvider>
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              </MainContextProvider>
            }
          ></Route>
        </Routes>
      </NavigationLayout>
    </AuthProvider>
  );
}

export default App;
