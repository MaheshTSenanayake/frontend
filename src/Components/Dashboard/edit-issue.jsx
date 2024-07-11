import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useMainContext } from "../../context/hooks/use-main-context";

function EditIssue() {
  const {
    edit_issue_open_state,
    close_edit_issue_dialog,
    issue_to_be_edit,
    update_issue,
  } = useMainContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
    priority: "",
    status: "",
  });

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

  const statusOptions = [
    { value: "Open", label: "Open" },
    { value: "Inprogress", label: "Inprogress" },
    { value: "Testing", label: "Testing" },
    { value: "Resolved", label: "Resolved" },
    { value: "Closed", label: "Closed" },
  ];

  useEffect(() => {
    if (issue_to_be_edit) {
      setFormData({
        title: issue_to_be_edit.title,
        description: issue_to_be_edit.description,
        severity: issue_to_be_edit.severity,
        priority: issue_to_be_edit.priority,
        status: issue_to_be_edit.status,
      });
    }
  }, [issue_to_be_edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    update_issue(issue_to_be_edit._id, formData);
    close_edit_issue_dialog();
  };

  return (
    <Dialog open={edit_issue_open_state} onClose={close_edit_issue_dialog}>
      <DialogTitle>Edit Issue</DialogTitle>
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
              value={formData?.title}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="Description"
              variant="standard"
              multiline
              rows={4}
              value={formData?.description}
              onChange={handleChange}
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
              value={formData?.severity}
              onChange={handleChange}
              helperText="Severity (Optional)"
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
              value={formData?.priority}
              onChange={handleChange}
              helperText="Priority (Optional)"
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
              value={formData?.status}
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
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
              gap: 2,
            }}
          >
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#0096ff",
                borderRadius: 1,
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Update Issue
            </Button>
            <Button
              sx={{
                textAlign: "center",
                bgcolor: "#ff0000",
                borderRadius: 1,
              }}
              variant="contained"
              onClick={close_edit_issue_dialog}
            >
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditIssue;
