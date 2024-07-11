import { Grid, Typography } from "@mui/material";

function Footer() {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ padding: 5, alignItems: "center", textAlign: "center" }}
      >
        <Typography variant="p" sx={{ fontSize: "15px", color: "#616363" }}>
          Copyright © 2024 Track Issue. All Rights Reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
