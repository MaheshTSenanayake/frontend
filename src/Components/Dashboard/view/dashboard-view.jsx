import React, { useEffect } from "react";

import { useMainContext } from "../../../context/hooks/use-main-context";
import { Box, Button, Paper } from "@mui/material";
import IssuesTable from "../issues-table";
import AddIcon from "@mui/icons-material/Add";
import AddNewIssue from "../add-new-issue";
import DeleteIssue from "../delete-issue";
import ViewIssue from "../view-issue";
import EditIssue from "../edit-issue";

function DashboardView() {
  const { get_all_issues, add_new_issue_open } = useMainContext();

  useEffect(() => {
    get_all_issues();
  }, [get_all_issues]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "80%", padding: 2 }}>
        <AddNewIssue />
        <DeleteIssue />
        <ViewIssue />
        <EditIssue />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => add_new_issue_open()}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add New Issue
          </Button>
        </Box>
        <IssuesTable />
      </Paper>
    </div>
  );
}

export default DashboardView;
