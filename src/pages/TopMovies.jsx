import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import './TopMovies.css';
import axios from 'axios';
import APIKey from '../config/key';

const TopMovies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTopMovies = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://imdb-api.com/en/API/Top250Movies/${APIKey}`);
      setMoviesData(data.items);
      setTotalPages(Math.ceil(data.items.length / 16));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const renderTopMovies = () => {
    if (loading || !moviesData?.length) {
      return <Spinner size="xl" />;
    }

    const startIndex = (currentPage - 1) * 16;
    const endIndex = startIndex + 16;
    const currentMovies = moviesData.slice(startIndex, endIndex);

    return (
      <Box className="movies-list">
        {currentMovies?.map(movie => (
          <Box className="movie" key={movie.id}>
            <Image src={movie.image} alt={movie.title} mb={4} borderRadius="md" />
            <Heading as="h4" size="md" mb={2}>
              {movie.title}
            </Heading>
            <Box className="movie-info">
              <Text className="rank">Rank: {movie.rank}</Text>
              <Text className="year">Year: {movie.year}</Text>
              <Text className="crew">Crew: {movie.crew}</Text>
              <Text className="rating">Rating: {movie.imDbRating}</Text>
              <Text className="rating-count">Rating Count: {movie.imDbRatingCount}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          colorScheme={currentPage === i ? 'blue' : 'gray'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box className="top-movies">
      <Heading as="h2" size="xl" mb={3}>
        Top 250 Movies
      </Heading>

      <Text as="h5" mb="20px">IMDb Top 250 as rated by regular IMDb voters.</Text>
      {renderTopMovies()}
      <Box mt={4}>
        <Button
          variant="outline"
          colorScheme="blue"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {renderPaginationButtons()}
        <Button
          variant="outline"
          colorScheme="blue"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TopMovies;
