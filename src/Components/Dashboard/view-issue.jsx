import React from "react";
import { useMainContext } from "../../context/hooks/use-main-context";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

function ViewIssue() {
  const { view_issue_open_state, close_view_issue_dialog, issue_to_be_view } =
    useMainContext();

  const severityOptions = [
    { value: "Critical", label: "Critical" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];
  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];
  const statusOption = [
    { value: "Open", label: "Open" },
    { value: "Inprogress", label: "Inprogress" },
    { value: "Testing", label: "Testing" },
    { value: "Resolved", label: "Resolved" },
    { value: "Closed", label: "Closed" },
  ];
  
  return (
    <Dialog open={view_issue_open_state} onClose={close_view_issue_dialog}>
      <DialogTitle>View issue</DialogTitle>
      <DialogContent>
        <Box sx={{ flexDirection: "column" }}>
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              paddingBottom: 2,
            }}
          >
            <TextField
              name="title"
              label="Title"
              variant="standard"
              value={issue_to_be_view.title}
              InputProps={{ readOnly: true }}
            />
            <TextField
              name="description"
              label="Description"
              variant="standard"
              multiline
              rows={4}
              value={issue_to_be_view.description}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              paddingBottom: 2,
            }}
          >
            <TextField
              name="severity"
              select
              label="Severity"
              variant="standard"
              value={issue_to_be_view.severity}
              helperText="Severity (Optional)"
              InputProps={{ readOnly: true }}
            >
              {severityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="priority"
              select
              label="Priority"
              variant="standard"
              value={issue_to_be_view.priority}
              helperText="Priority (Optional)"
              InputProps={{ readOnly: true }}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="status"
              select
              label="Status"
              variant="standard"
              value={issue_to_be_view.status}
              InputProps={{ readOnly: true }}
            >
              {statusOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              flexDirection: "row",
              paddingBottom: 2,
            }}
          >
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#0096ff",
                borderRadius: 1,
              }}
              variant="contained"
              onClick={close_view_issue_dialog}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewIssue;
