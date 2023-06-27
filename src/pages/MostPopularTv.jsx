import { useEffect, useState } from 'react';
import { Spinner, Flex, Box, Image, Text, Badge, Stack } from '@chakra-ui/react';
import axios from 'axios';
import APIKey from '../config/key';

const MostPopularTv = () => {
  const [loading, setLoading] = useState(false);
  const [mostPopularTvData, setMostPopularTvData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://imdb-api.com/en/API/MostPopularTVs/${APIKey}`);
        setMostPopularTvData(data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mostPopularTvData.slice(indexOfFirstItem, indexOfLastItem);

  const renderMostPopularTvs = () => {
    if (loading || !currentItems?.length) {
      return <Spinner size="xl" />;
    }

    return (
      <Flex flexWrap="wrap" mt={4}>
        {currentItems?.map((dataTv) => (
          <Box key={dataTv.id} p={4} width={{ base: '100%', md: '50%', lg: '25%' }}>
            <Box bg="white" boxShadow="md" p={4} borderRadius="md">
              <Image src={dataTv.image} alt={dataTv.title} />
              <Text mt={2} fontSize="xl" fontWeight="bold">
                {dataTv.title}
              </Text>
              <Text fontSize="sm">
                <Badge colorScheme="purple" mr={1}>
                  Rank: {dataTv.rank}
                </Badge>
                Year: {dataTv.year}
              </Text>
              <Text fontSize="sm">Crew: {dataTv.crew}</Text>
              <Text fontSize="sm">IMDb Rating: {dataTv.imDbRating}</Text>
            </Box>
          </Box>
        ))}
      </Flex>
    );
  };

  const totalPages = Math.ceil(mostPopularTvData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (mostPopularTvData.length <= itemsPerPage) {
      return null;
    }

    return (
      <Stack direction="row" spacing={2} mt={4} align="center" justify="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Box
            key={index}
            as="button"
            px={2}
            py={1}
            rounded="md"
            bg={currentPage === index + 1 ? 'purple.500' : 'gray.200'}
            color={currentPage === index + 1 ? 'white' : 'gray.800'}
            fontWeight={currentPage === index + 1 ? 'bold' : 'normal'}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Most Popular TV's
      </Text>
      {renderMostPopularTvs()}
      {renderPagination()}
    </Box>
  );
};

export default MostPopularTv;
