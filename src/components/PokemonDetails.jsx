import { useGetPokemonByNameQuery } from '../api/pokeApi';
import SideDrawer from './SideDrawer';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

import StatRows from './StatRows';

export default function PokemonDetails({ nameOrId, onClose }) {
  const { data, isLoading, isError, refetch } = useGetPokemonByNameQuery(nameOrId, {
    skip: !nameOrId,
  });

  return (
    <SideDrawer open={!!nameOrId} onClose={onClose} title="Pokémon">
      {isLoading && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ mb: 1 }}>Loading details...</Typography>
          <LinearProgress />
        </Box>
      )}

      {!isLoading && isError && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ mb: 1 }}>Error loading details.</Typography>
          <Button variant="contained" onClick={refetch}>
            Retry
          </Button>
        </Box>
      )}

      {!isLoading && !isError && data && (
        <>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h5"
              sx={{ textTransform: 'capitalize', fontWeight: 900, lineHeight: 1.1 }}
            >
              {data.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              #{String(data.id).padStart(3, '0')}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={data.sprites?.other?.['official-artwork']?.front_default}
              alt={data.name}
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              {data.types.map((t) => (
                <Chip
                  key={t.type.name}
                  label={t.type.name}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1 }}>
              Stats
            </Typography>

            <Stack spacing={1.2}>
              {data.stats.map((s) => (
                <StatRows
                  key={s.stat.name}
                  label={s.stat.name}
                  value={s.base_stat}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}

      {!isLoading && !isError && !data && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'text.secondary' }}>No data.</Typography>
        </Box>
      )}
    </SideDrawer>
  );
}