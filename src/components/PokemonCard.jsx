import { usePrefetch } from "../api/pokeApi";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function PokemonCard({ pokemon, onSelect }) {
  const prefetchPokemon = usePrefetch("getPokemonByName");
  const id = pokemon.url.split("/").filter(Boolean).pop();
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <ImageListItem
      onMouseEnter={() => prefetchPokemon(pokemon.name, { force: false })}
      onPointerEnter={() => prefetchPokemon(pokemon.name, { force: false })}
      onFocus={() => prefetchPokemon(pokemon.name, { force: false })}
      tabIndex={0}
      onClick={() => onSelect(pokemon.name)}
      sx={{
        cursor: "pointer",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#fff",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        outline: "none",
      }}
    >
      <img
        src={spriteUrl}
        alt={pokemon.name}
        loading="lazy"
        style={{
          display: "block",
          margin: "16px auto",
          width: 96,
          height: 96,
          objectFit: "contain",
        }}
      />

      <ImageListItemBar
        title={pokemon.name}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255,255,255,0.7)" }}
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
          bgcolor: "rgba(25, 118, 210, 0.7)",
          "& .MuiImageListItemBar-title": {
            color: "#fff",
            textTransform: "capitalize",
          },
        }}
      />
    </ImageListItem>
  );
}