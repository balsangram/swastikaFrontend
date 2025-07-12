import React from 'react';
import { Avatar, Box, Typography, Stack } from '@mui/material';

function Friend({ profilePic, name, message, time, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5,
        marginBottom: 1,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: '#eaeaea',
        },
      }}
    >
      <Avatar src={profilePic} alt={name} sx={{ width: 50, height: 50, marginRight: 2 }} />
      <Box flex="1">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" noWrap>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default Friend;
