import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { useMainContext } from "../../context/hooks/use-main-context";

function DeleteIssue() {
  const {
    delete_issue_open_state,
    close_delete_issue_dialog,
    delete_issue,
    issue_to_be_deleted,
  } = useMainContext();
  return (
    <Dialog open={delete_issue_open_state} onClose={close_delete_issue_dialog}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete issue?
        </DialogContentText>
      </DialogContent>
      <div>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#fc0000",
            borderRadius: 1,
            margin: 1,
          }}
          variant="contained"
          onClick={() => {
            delete_issue(issue_to_be_deleted._id);
            close_delete_issue_dialog();
          }}
        >
          Delete
        </Button>
        <Button
          sx={{
            textAlign: "center",
            bgcolor: "#0096ff",
            borderRadius: 1,
            margin: 1,
          }}
          variant="contained"
          onClick={close_delete_issue_dialog}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

export default DeleteIssue;
