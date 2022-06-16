import React from 'react';
import { Box, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme, experimental_extendTheme } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Box sx={{ display: { md: 'flex' }, mr: 1 }}>
      <IconButton
        size="large"
        aria-label="switch theme"
        aria-controls="switch-theme"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
        color="inherit"
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
