import { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { useRouter } from "../../routes/hooks/use-router";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useSearchParams } from "../../routes/hooks/use-search-params";

function LoginComponent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openLoginFail, setOpenLoginFail] = useState(false);

  const { user_login, user } = useAuthContext();

  useEffect(() => {
    if (user !== null) {
      router.push("/dashboard");
    }
  }, [user]);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    setErrorMsg("");
    const loginDetails = {
      email: email,
      password: password,
    };
    try {
      await user_login(loginDetails);

      router.push(returnTo || "/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
      setOpenLoginFail(true);
      reset();
    }
  };

  const handleCloseLoginFail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginFail(false);
  };

  const keyEnterLogin = (key) => {
    if (key.code === "Enter") {
      login();
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: "center", color: "#0096ff" }} variant="h4">
          SIGN IN
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={email}
          id="email"
          variant="outlined"
          label="Email Address"
          onChange={(e) => getEmail(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="password"
          value={password}
          variant="outlined"
          label="Password"
          type="password"
          onChange={(e) => getPassword(e)}
          onKeyDown={(key) => keyEnterLogin(key)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{
            bgcolor: "#0096ff",
            borderRadius: 1,
            width: "100%",
          }}
          variant="contained"
          onClick={login}
        >
          Login
        </Button>
        <Snackbar
          open={openLoginFail}
          autoHideDuration={6000}
          onClose={handleCloseLoginFail}
        >
          <Alert
            onClose={handleCloseLoginFail}
            severity="error"
            sx={{
              width: "100%",
              bgcolor: "#ff0022",
              color: "#ffffff",
              "& .MuiAlert-icon": {
                color: "#ffffff",
              },
            }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
