import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessPopup = ({ open, onClose, title, children, showIcon = false }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                {showIcon && (
                    <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
                )}
                {title && (
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>
                )}
                <Typography variant="body1">{children}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                {/* <Button variant="contained" onClick={onClose}>
                    OK
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default SuccessPopup;
