import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

// Custom StyledBadge with green dot
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center h-[10vh]">
      <div className="flex items-center p-4 gap-2">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          onClick={() => navigate("/profile")}
        >
          <Avatar alt="Remy Sharp" src="/img/profile.jpg" />
        </StyledBadge>
        <p className="cursor-pointer" onClick={() => navigate("/profile")}>Name</p>
      </div>
      <div className="p-4 cursor-pointer">
        <Badge color="secondary" badgeContent={0} showZero>
          <NotificationsIcon onClick={() => navigate("/notification")} />
        </Badge>
      </div>
    </div>
  );
}

export default Header;
