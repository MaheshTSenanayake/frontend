import { useLocation } from "react-router";

import { Button, Grid, Typography } from "@mui/material";

import { useRouter } from "../../routes/hooks/use-router";
import { paths } from "../../routes/paths";

function MainNavigation() {
  const router = useRouter();

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      paddingLeft={30}
      paddingRight={30}
    >
      <Grid
        item
        xs={12}
        md={5}
        textAlign="left"
        onClick={() => router.push(paths.root)}
      >
        <Typography>Issues Tracker</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container spacing={2} justifyContent={{ md: "right" }}>
          <Grid item>
            {isLoginPage ? (
              <Button
                onClick={() => router.push(paths.login)}
                size="small"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                }}
              >
                Register
              </Button>
            ) : (
              <Button
                onClick={() => router.push(paths.login)}
                size="small"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                }}
              >
                Log In
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainNavigation;
