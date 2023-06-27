import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopMovies from './pages/TopMovies';
import MostPopularTv from './pages/MostPopularTv';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<TopMovies />} />
          <Route path="/mostPopularTvs" element={<MostPopularTv />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
