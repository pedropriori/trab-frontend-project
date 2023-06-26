import { useCallback, useEffect, useState } from 'react';
import { Box, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import './TopMovies.css';
import axios from 'axios';
import APIKey from '../config/key';

const TopMovies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopMovies = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://imdb-api.com/en/API/Top250Movies/${APIKey}`);
      setMoviesData(data.items);
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

    return (
      <Box className="movies-list">
        {moviesData?.map(movie => (
          <Box className="movie" key={movie.id}>
            <Image src={movie.image} alt={movie.fullTitle} mb={4} borderRadius="md" />
            <Heading as="h4" size="md" mb={2}>
              {movie.fullTitle}
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

  return (
    <Box className="top-movies">
      <Heading as="h2" size="xl" mb={4}>
        Top 250 Movies
      </Heading>
      {renderTopMovies()}
    </Box>
  );
};

export default TopMovies;


// import { useCallback, useEffect, useState } from 'react';
// import './TopMovies.css'
// import axios from 'axios';
// import APIKey from '../config/key';

// const TopMovies = () => {
//     const [moviesData, setMoviesData] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchTopMovies = useCallback(async () => {

//         try {

//             setLoading(true);
//             const { data } = await axios.get(`https://imdb-api.com/en/API/Top250Movies/${APIKey}`);
//             setMoviesData(data.items);

//         } catch (error) {
//             console.log(error)

//         } finally {
//             setLoading(false);
//         }
//     }, [])

//     useEffect(() => {
//         fetchTopMovies();
//     }, [])

//     const renderTopMovies = () => {
//         if (loading || !moviesData?.length) {
//             return (<h3>Loading...</h3>)
//         }

//         return (
//             <div>
//                 {moviesData?.map(movie => (
//                     <div>
//                         <img src={movie.image}/>
//                         <h4>{movie.fullTitle}</h4>
//                         <h3>Rank: {movie.rank}</h3>
//                         <h3>Year: {movie.year}</h3>
//                         <h3>Crew: {movie.crew}</h3>
//                         <h3>Rating: {movie.imDbRating}</h3>
//                         <h3>Rating Count: {movie.imDbRatingCount}</h3>
//                     </div>
//                 ))}
//             </div>
//         )
//     }

//     return (
//         <div>
//             <h2>Top 250 Movies</h2>
//             {renderTopMovies()}
//         </div>
//     );
// }

// export default TopMovies;