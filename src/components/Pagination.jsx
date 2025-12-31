import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Pagination({ offset, limit, hasNext, onPrev, onNext }) {
  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant="contained"
        onClick={onPrev}
        disabled={offset === 0}
        sx={{ bgcolor: '#fff', color: 'primary.main', border: '1px solid', borderColor: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}
      >
        Prev
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={!hasNext}
        sx={{ bgcolor: '#fff', color: 'primary.main', border: '1px solid', borderColor: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}
      >
        Next
      </Button>
    </Box>
  );
}
