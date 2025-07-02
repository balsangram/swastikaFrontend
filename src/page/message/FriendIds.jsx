import React from 'react';
import { Box } from '@mui/material';
import Friend from '../../components/message/Friend';
import { useNavigate } from 'react-router-dom';

const dummyFriends = [
  {
    id: 1,
    name: 'Sangram',
    profilePic: 'https://via.placeholder.com/40',
    message: 'Hey, how are you?',
    time: '10:30 AM',
  },
  {
    id: 2,
    name: 'John Doe',
    profilePic: 'https://via.placeholder.com/40',
    message: 'Let’s meet tomorrow!',
    time: '9:15 AM',
  },
  {
    id: 3,
    name: 'Jane Smith',
    profilePic: 'https://via.placeholder.com/40',
    message: 'Sent the documents.',
    time: 'Yesterday',
  },
];

function FriendIds() {
  const navigate = useNavigate(); // ✅ fixed

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
      {dummyFriends.map(friend => (
        <Friend
          key={friend.id}
          {...friend}
          onClick={() => navigate('/ChatPage')} // ✅ fixed
        />
      ))}
    </Box>
  );
}

export default FriendIds;
