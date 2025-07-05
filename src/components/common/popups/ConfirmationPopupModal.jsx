import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

const ConfirmationPopupModal = ({ open, onClose, title, children, onConfirm, confirmText = "OK", cancelText = "Cancel" }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            {title && (
                <DialogTitle>
                    <Typography variant="h6">{title}</Typography>
                </DialogTitle>
            )}
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">{cancelText}</Button>
                {onConfirm && (
                    <Button onClick={onConfirm} variant="contained" color="primary">
                        {confirmText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationPopupModal;
