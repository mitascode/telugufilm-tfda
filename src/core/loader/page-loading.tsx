import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',  
                alignItems: 'center',      
                minHeight: '100vh',        
            }}
        >
            <CircularProgress aria-label="Loading..." size={48} color="secondary" />
        </Box>
    );
};

