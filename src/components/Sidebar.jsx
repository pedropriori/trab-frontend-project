import React, { useState } from 'react';
import { Box, Button, Flex, List, ListItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      bg="#f0f0f0"
      h="100vh"
      width={expanded ? '200px' : '50px'}
      transition="width 0.3s ease"
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
    >
      <Flex direction="column" height="100%">
        <Button
          onClick={toggleSidebar}
          fontWeight="bold"
          p="4"
          mb="4"
          textAlign="center"
          cursor="pointer"
        >
          <GiHamburgerMenu />
        </Button>
        {expanded && (
          <Box p="4">
            <List spacing={3}>
              <ListItem cursor="pointer" onClick={() => navigate('/')}>
                Top 250 Movies
              </ListItem>
              <ListItem
                cursor="pointer"
                onClick={() => navigate('/mostPopularTvs')}
              >
                Most Popular TV's
              </ListItem>
            </List>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
