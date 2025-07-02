import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

function Bottom() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // ✅ lowercase by convention

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #ddd',
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Back"
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)} // ✅ go one page back
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate('/')}
        />
        <BottomNavigationAction
          label="Important"
          icon={<StarIcon color="warning" />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Bottom;
