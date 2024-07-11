import React from "react";
import { useMainContext } from "../../context/hooks/use-main-context";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function IssuesTable() {
  const { issues_data } = useMainContext();

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
            <TableCell>Action</TableCell>
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
                <TableCell>{issue.severity}</TableCell>
                <TableCell>{issue.priority}</TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell>
                  <EditIcon
                    
                    sx={{ color: "#24b200" }}
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">
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
