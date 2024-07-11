import React, { useEffect } from "react";

import { useMainContext } from "../../../context/hooks/use-main-context";
import { Box, Button, Paper } from "@mui/material";
import IssuesTable from "../issues-table";
import AddIcon from "@mui/icons-material/Add";

function DashboardView() {
  const { get_all_issues } = useMainContext();
  useEffect(() => {
    get_all_issues();
  }, [get_all_issues]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "80%", padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add New Issue
          </Button>
        </Box>
        <IssuesTable />
      </Paper>
    </div>
  );
}

export default DashboardView;
