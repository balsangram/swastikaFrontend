import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...', fullPage = false, size = 50 }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: fullPage ? '100vh' : '100%',
                width: '100%',
            }}
        >
            <CircularProgress size={size} />
            {message && (
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default Loader;