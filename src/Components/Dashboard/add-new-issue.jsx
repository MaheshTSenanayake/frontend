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

function AddNewIssue() {
  const { add_new_issue_open_state, add_new_issue_close, save_new_issue } =
    useMainContext();

  const initialFormData = {
    title: "",
    description: "",
    severity: "",
    priority: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    save_new_issue(formData);
    add_new_issue_close();
  };

  useEffect(() => {
    if (!add_new_issue_open_state) {
      setFormData(initialFormData);
    }
  }, [add_new_issue_open_state]);

  return (
    <Dialog open={add_new_issue_open_state} onClose={add_new_issue_close}>
      <DialogTitle>Add new issue</DialogTitle>
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
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="Description"
              variant="standard"
              multiline
              rows={4}
              value={formData.description}
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
              value={formData.severity}
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
              value={formData.priority}
              onChange={handleChange}
              helperText="Priority (Optional)"
            >
              {priorityOptions.map((option) => (
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
              onClick={handleSubmit}
            >
              Add Issue
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewIssue;
