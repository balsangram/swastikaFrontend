import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Note() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/swastic/note/');
      setNotes(res.data.notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    navigate('/editNote');
  };

  const handleEditNote = (note) => {
    navigate('/editNote', { state: note });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Your Notes</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNote}
          >
            Add Note
          </Button>
        </Box>

        {notes.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No notes found.
          </Typography>
        ) : (
          <List>
            {notes.map((note) => (
              <ListItem key={note._id} disablePadding>
                <ListItemButton onClick={() => handleEditNote(note)}>
                  <ListItemIcon>
                    <PushPinIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary={note.headline} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default Note;
