import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Layout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mini Pokédex 
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2, bgcolor: 'primary.main', minHeight: '80vh', borderRadius: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
