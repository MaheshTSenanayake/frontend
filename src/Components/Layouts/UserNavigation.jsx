import { useState } from "react";
import {
  AppBar,
  Avatar,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "../../routes/hooks/use-router";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { paths } from "../../routes/paths";

function UserNavigation() {
  const router = useRouter();
  const { user_logout } = useAuthContext();

  const userData = sessionStorage.getItem("userData");
  const userName =
    userData !== null ? JSON.parse(userData)?.name : "Guest User";
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    user_logout();
    router.push(paths.root);
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        paddingLeft: { md: 10 },
        paddingRight: 10,
      }}
    >
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Grid container alignItems="center">
              <Grid
                item
                md={11}
                sx={{
                  textAlign: { md: "right", xs: "left" },
                  paddingRight: "5px",
                }}
              >
                <Typography>Issues Tracker</Typography>
              </Grid>

              <Grid
                item
                md={1}
                sx={{
                  textAlign: { md: "right", xs: "left" },
                }}
              >
                <Avatar onClick={handleMenuOpen}>
                  {getInitials(userName)}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={logout}>
                    <Grid container spacing={3}>
                      <Grid item xs={4} alignItems="center">
                        <LogoutIcon sx={{ fontSize: 20, color: "#1976d2" }} />
                      </Grid>
                      <Grid item xs={8} alignItems="center">
                        <Typography color="#1976d2">Logout</Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavigation;
