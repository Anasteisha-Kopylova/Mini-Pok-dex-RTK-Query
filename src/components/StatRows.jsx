import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export default function StatRows({ label, value, max = 200 }) {
  const normalized = Math.min((value / max) * 100, 100);

  return (
    <Box sx={{ display: 'grid', gap: 0.75 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          sx={{ textTransform: 'capitalize', color: 'text.secondary' }}
        >
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={normalized}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: 'action.hover',
          '& .MuiLinearProgress-bar': { borderRadius: 999 },
        }}
      />
    </Box>
  );
}