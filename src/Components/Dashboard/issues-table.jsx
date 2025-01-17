import React from "react";
import { useMainContext } from "../../context/hooks/use-main-context";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function IssuesTable() {
  const {
    issues_data,
    open_delete_issue_dialog,
    open_view_issue_dialog,
    open_edit_issue_dialog,
  } = useMainContext();

  const { user } = useAuthContext();
  const userData = user;

  function getSeverityColor(severity) {
    switch (severity) {
      case "Low":
        return "success";
      case "Medium":
        return "primary";
      case "High":
        return "secondary";
      case "Critical":
        return "error";
      default:
        return "default";
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "Low":
        return "success";
      case "Medium":
        return "primary";
      case "High":
        return "error";
      default:
        return "default";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "Open":
        return "primary";
      case "Inprogress":
        return "success";
      case "Testing":
        return "secondary";
      case "Resolved":
        return "warning";
      case "Closed":
        return "error";
      default:
        return "default";
    }
  }

  return (
    <TableContainer>
      <Table style={{ marginTop: 4 }}>
        <TableHead
          style={{
            backgroundColor: "#F1EFEF",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            {userData.role !== "user" && <TableCell>Action</TableCell>}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues_data === null ? (
            <TableRow>
              <TableCell colSpan={7}>No Issue To Show</TableCell>
            </TableRow>
          ) : (
            issues_data?.map((issue, index) => (
              <TableRow key={index}>
                <TableCell>{issue.title}</TableCell>
                <TableCell>
                  <Chip
                    label={issue.severity}
                    color={getSeverityColor(issue.severity)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={issue.priority}
                    color={getPriorityColor(issue.priority)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={issue.status}
                    color={getStatusColor(issue.status)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                {userData.role !== "user" && (
                  <TableCell>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <EditIcon
                        onClick={() => open_edit_issue_dialog(issue)}
                        sx={{ color: "#24b200" }}
                      />
                      <DeleteIcon
                        onClick={() => open_delete_issue_dialog(issue)}
                        sx={{ color: "#ff0000" }}
                      />
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    onClick={() => open_view_issue_dialog(issue)}
                    size="small"
                    variant="outlined"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IssuesTable;
