import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

function SearchIssue({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search charts by name or tags"
        variant="outlined"
        size="small"
        sx={{
          marginLeft: 1,
          height: "38px",
        }}
        value={searchTerm}
        onChange={handleSearch}
      />
    </Box>
  );
}

export default SearchIssue;
