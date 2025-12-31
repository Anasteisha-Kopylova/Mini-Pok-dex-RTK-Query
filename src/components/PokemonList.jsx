import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useGetPokemonListQuery, pokeApi } from '../api/pokeApi';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Pagination from './Pagination';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LIMIT = 20;

export default function PokemonList({ onSelect }) {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError, refetch } = useGetPokemonListQuery({ limit: LIMIT, offset });

  const dispatch = useDispatch();

  const handleHover = useCallback(
    (name) => {
      if (!name) return;
      dispatch(pokeApi.util.prefetch('getPokemonByName', name, { force: false }));
    },
    [dispatch]
  );

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography sx={{ mb: 2 }}>Error loading Pokémon list.</Typography>
        <Button variant="contained" onClick={refetch}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data?.results?.length) return <Typography>No Pokémon found.</Typography>;

  return (
    <Box>
      <ImageList cols={4} gap={16}>
        {data.results.map((pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <ImageListItem
              key={pokemon.name}
              onMouseEnter={() => handleHover(pokemon.name)}
              onPointerEnter={() => handleHover(pokemon.name)}
              onClick={() => onSelect(pokemon.name)}
              sx={{
                cursor: 'pointer',
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: '#fff',
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <img
                src={spriteUrl}
                alt={pokemon.name}
                loading="lazy"
                style={{
                  display: 'block',
                  margin: '16px auto',
                  width: 96,
                  height: 96,
                  objectFit: 'contain',
                }}
              />

              <ImageListItemBar
                title={pokemon.name}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                    aria-label="open details"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(pokemon.name);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
                sx={{
                  bgcolor: 'rgba(25, 118, 210, 0.7)',
                  '& .MuiImageListItemBar-title': { color: '#fff', textTransform: 'capitalize' },
                }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>

      <Pagination
        offset={offset}
        limit={LIMIT}
        hasNext={!!data.next}
        onPrev={() => setOffset((prev) => Math.max(prev - LIMIT, 0))}
        onNext={() => setOffset((prev) => prev + LIMIT)}
      />
    </Box>
  );
}
