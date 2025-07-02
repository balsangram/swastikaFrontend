import React from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';

function Friend({ id, name, profilePic, message, time, onClick }) {
  return (
    <Paper
      elevation={1}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1.5,
        marginBottom: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={profilePic} alt={name} sx={{ width: 48, height: 48 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 200 }}
            noWrap
          >
            {message}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {time}
      </Typography>
    </Paper>
  );
}

export default Friend;
