import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PaletteIcon from '@mui/icons-material/Palette';
import axios from 'axios';

function EditNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingNote = location.state || {};
  const [headline, setHeadline] = useState(existingNote.headline || '');
  const [status, setStatus] = useState(existingNote.status || 'private');

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Bold],
    content: existingNote.content || '',
  });

  const handleSave = async () => {
    const payload = {
      headline,
      content: editor.getHTML(),
      status,
    };

    try {
      if (existingNote._id) {
        await axios.put(`http://localhost:8000/swastic/note/update/${existingNote._id}`, payload);
      } else {
        await axios.post('http://localhost:8000/swastic/note/create', payload);
      }
      navigate('/note');
    } catch (err) {
      console.error('Error saving note:', err.message);
    }
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const applyColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          {existingNote._id ? 'Edit Note' : 'Create New Note'}
        </Typography>

        <TextField
          label="Headline"
          variant="outlined"
          fullWidth
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Tooltip title="Bold">
            <IconButton onClick={toggleBold}>
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Red">
            <IconButton onClick={() => applyColor('red')}>
              <PaletteIcon sx={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Green">
            <IconButton onClick={() => applyColor('green')}>
              <PaletteIcon sx={{ color: 'green' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Blue">
            <IconButton onClick={() => applyColor('blue')}>
              <PaletteIcon sx={{ color: 'blue' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Editor */}
        <Box
          sx={{
            border: '1px solid #ccc',
            padding: 2,
            borderRadius: '5px',
            minHeight: '200px',
            mb: 3,
          }}
        >
          <EditorContent editor={editor} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography sx={{ marginRight: 2 }}>Status:</Typography>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} size="small">
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="public">Public</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleSave}
        >
          💾 {existingNote._id ? 'Update Note' : 'Add Note'}
        </Button>
      </Paper>
    </Box>
  );
}

export default EditNote;
