import { useState } from 'react';
import Layout from '../src/components/Layout';
import PokemonList from '../src/components/PokemonList';
import PokemonDetails from '../src/components/PokemonDetails';

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <Layout>
      <PokemonList onSelect={setSelected} />
      <PokemonDetails
        nameOrId={selected}
        onClose={() => setSelected(null)}
      />
    </Layout>
  );
}

export default App;
