import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMovies from "./pages/TopMovies";
import MostPopularTv from "./pages/MostPopularTv";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <Flex>
          <Sidebar />
          <Flex flex="1" ml="200px" p={4}>
            <Routes>
              <Route path="/" element={<TopMovies />} />
              <Route path="/mostPopularTvs" element={<MostPopularTv />} />
            </Routes>
          </Flex>
        </Flex>
      </ChakraProvider>
    </Router>
  );
};

export default App;
