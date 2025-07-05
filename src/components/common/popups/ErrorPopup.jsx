import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPopup = ({ open, onClose, title = 'Error', children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <Box display="flex" justifyContent="center" mt={2}>
                <ErrorOutlineIcon color="error" fontSize="large" />
            </Box>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography align="center">{children}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', mb: 1 }}>
                <Button onClick={onClose} color="error" variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorPopup;
