import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Grid,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TimeTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDay, setTaskDay] = useState("Monday");
  const [repeat, setRepeat] = useState("none");
  const [repeatDays, setRepeatDays] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (taskText && taskTime) {
      let newTasks = [];

      if (repeat === "everyday") {
        newTasks = daysOfWeek.map((day) => ({
          text: taskText,
          time: taskTime,
          day,
          repeat,
          repeatDays: [],
        }));
      } else if (repeat === "custom" && repeatDays.length > 0) {
        newTasks = repeatDays.map((day) => ({
          text: taskText,
          time: taskTime,
          day,
          repeat,
          repeatDays,
        }));
      } else {
        newTasks = [
          {
            text: taskText,
            time: taskTime,
            day: taskDay,
            repeat,
            repeatDays: [],
          },
        ];
      }

      if (editIndex !== null) {
        const taskToEdit = tasks[editIndex];
        let updatedTasks = tasks.filter((t) => {
          if (t.text === taskToEdit.text && t.time === taskToEdit.time) {
            if (taskToEdit.repeat === "everyday") {
              return false;
            } else if (taskToEdit.repeat === "custom") {
              return !taskToEdit.repeatDays.includes(t.day);
            }
            return false;
          }
          return true;
        });

        updatedTasks = [...updatedTasks, ...newTasks];
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, ...newTasks]);
      }

      resetForm();
    }
  };

  const resetForm = () => {
    setTaskText("");
    setTaskTime("");
    setTaskDay("Monday");
    setRepeat("none");
    setRepeatDays([]);
    setOpen(false);
  };

  const handleDelete = (index) => {
    const taskToDelete = tasks[index];
    let updatedTasks = tasks.filter((t) => {
      if (t.text === taskToDelete.text && t.time === taskToDelete.time) {
        if (taskToDelete.repeat === "everyday") {
          return false;
        } else if (taskToDelete.repeat === "custom") {
          return !taskToDelete.repeatDays.includes(t.day);
        }
        return false;
      }
      return true;
    });
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setTaskText(task.text);
    setTaskTime(task.time);
    setTaskDay(task.day);
    setRepeat(task.repeat || "none");

    if (task.repeat === "custom") {
      setRepeatDays(task.repeatDays || [task.day]);
    } else {
      setRepeatDays([]);
    }

    setEditIndex(index);
    setOpen(true);
  };

  const handleDayCheckboxChange = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom>📆 Weekly Time Table</Typography>

    <Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%'
}}>
  {/* Weekday Tabs - Optional if you want horizontal scrolling tabs */}
  {/* <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, pb: 1 }}>
    {daysOfWeek.map(day => (
      <Button 
        key={day} 
        variant="outlined"
        sx={{ 
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          borderRadius: 4
        }}
      >
        {day}
      </Button>
    ))}
  </Box> */}

  {/* Main Content */}
  <Box sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: isMobile ? 'nowrap' : 'wrap',
    gap: 2,
    width: '100%'
  }}>
    {daysOfWeek.map((day) => (
      <Paper 
        key={day}
        elevation={2}
        sx={{
          flex: isMobile ? '0 0 auto' : '1 1 calc(33.333% - 16px)',
          minWidth: isMobile ? '100%' : 300,
          p: 2,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          {day}
        </Typography>

        {tasks.filter(t => t.day === day).length === 0 ? (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            No tasks scheduled
          </Typography>
        ) : (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}>
            {tasks
              .filter(t => t.day === day)
              .map((task, index) => {
                const actualIndex = tasks.findIndex(
                  t => t.day === task.day && t.text === task.text && t.time === task.time
                );
                
                return (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {task.time}
                      </Typography>
                      <Typography variant="body2">
                        {task.text}
                      </Typography>
                      {task.repeat !== "none" && (
                        <Typography variant="caption" color="text.secondary">
                          {task.repeat === "everyday" 
                            ? "Repeats daily" 
                            : `Repeats on: ${task.repeatDays?.join(', ') || ''}`
                          }
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex',
                      gap: 0.5
                    }}>
                      <IconButton 
                        onClick={() => handleEdit(actualIndex)}
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '&:hover': { bgcolor: 'primary.light' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(actualIndex)}
                        size="small"
                        sx={{
                          color: 'error.main',
                          '&:hover': { bgcolor: 'error.light' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        )}
      </Paper>
    ))}
  </Box>
</Box>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      <Dialog 
        open={open} 
        onClose={resetForm} 
        fullWidth 
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle>{editIndex !== null ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Time"
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          {repeat === "none" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Day</InputLabel>
              <Select
                value={taskDay}
                label="Day"
                onChange={(e) => setTaskDay(e.target.value)}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Repeat</InputLabel>
            <Select
              value={repeat}
              label="Repeat"
              onChange={(e) => setRepeat(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="everyday">Every Day</MenuItem>
              <MenuItem value="custom">Custom Days</MenuItem>
            </Select>
          </FormControl>

          {repeat === "custom" && (
            <FormControl component="fieldset" fullWidth margin="normal">
              <Typography variant="subtitle1" gutterBottom>Select Days</Typography>
              <FormGroup row={!isMobile}>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={repeatDays.includes(day)}
                        onChange={() => handleDayCheckboxChange(day)}
                        name={day}
                      />
                    }
                    label={day}
                    sx={{ width: isMobile ? "100%" : "auto" }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button 
            onClick={handleAddTask} 
            variant="contained"
            disabled={repeat === "custom" && repeatDays.length === 0}
          >
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTable;