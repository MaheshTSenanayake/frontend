import { Grid, Paper } from "@mui/material";
import React from "react";
import LoginComponent from "../Components/Login/LoginComponent";

function LoginPage() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ bgcolor: "#fafafa", minHeight: "100vh", paddingTop: 25 }}
    >
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: 400,
            mx: "auto",
            minHeight: "50vh",
          }}
        >
          <LoginComponent />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
