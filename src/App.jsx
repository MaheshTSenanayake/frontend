import { Route, Routes } from "react-router";

import "./App.css";

import { AuthProvider } from "./auth/auth-provider";
import AuthGuard from "./auth/guard/auth-guard";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
