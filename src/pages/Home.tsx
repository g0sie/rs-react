import SearchBar from '../components/SearchBar/SearchBar';
import Cards from '../components/Cards/Cards';

const Home = () => {
  return (
    <main className="page flex flex-col gap-10 items-center pt-10 pb-12">
      <SearchBar />
      <Cards />
    </main>
  );
};

export default Home;
