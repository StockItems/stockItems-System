import React from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  value?: string;
  onChange: (text: string) => void;
}

const Search = ({ value = '', onChange }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: 2, 
        marginBottom: 1,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="ค้นหาชื่ออุปกรณ์"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
