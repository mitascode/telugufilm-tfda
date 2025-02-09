import { Box, CircularProgress } from '@mui/material';
import React from 'react';

function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',  // Horizontally centers the spinner
                alignItems: 'center',      // Vertically centers the spinner
                minHeight: '100vh',        // Ensures the container takes full viewport height
            }}
        >
            <CircularProgress aria-label="Loading..." size={48} color="secondary" />
        </Box>
    );
}

export default Loading;
