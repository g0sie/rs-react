import Card from '../components/Cards/Card/Card';
import SearchBar from '../components/SearchBar/SearchBar';

import { character } from '../components/Cards/Card/character.example';

const Home = () => {
  return (
    <main className="page flex flex-col items-center pt-10">
      <SearchBar />
      <Card {...character} />
    </main>
  );
};

export default Home;
