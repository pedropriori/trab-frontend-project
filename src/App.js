import { ChakraProvider } from '@chakra-ui/react'
import TopMovies from './pages/TopMovies';

function App() {
  return (
    <ChakraProvider>
      <TopMovies />
    </ChakraProvider>
  );
}

export default App;
