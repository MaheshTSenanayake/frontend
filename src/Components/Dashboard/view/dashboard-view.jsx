import React, { useEffect } from "react";

import { useMainContext } from "../../../context/hooks/use-main-context";
import { Paper } from "@mui/material";
import IssuesTable from "../issues-table";

function DashboardView() {
  const { get_all_issues } = useMainContext();
  useEffect(() => {
    get_all_issues();
  }, [get_all_issues]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "80%", padding: 2 }}>
        <IssuesTable />
      </Paper>
    </div>
  );
}

export default DashboardView;
