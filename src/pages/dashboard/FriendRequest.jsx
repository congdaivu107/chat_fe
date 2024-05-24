import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import { MagnifyingGlass, Check, X } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import friendService from '../../services/friendService';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchFriendsList();
    fetchFriendRequests();
  }, []);

  const fetchFriendsList = async () => {
    try {
      const response = await friendService.getListFriend();
      console.log('Fetched friends list:', response.data);
      setFriends(response.data || []);
    } catch (error) {
      console.error('Error fetching friends list:', error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await friendService.getFriendRequests();
      console.log('Fetched friend requests:', response.data);
      setFriendRequests(response.data || []);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const handleAccept = async (friendId) => {
    try {
      await friendService.acceptFriendRequest(friendId);
      setFriendRequests((prev) => prev.filter((fr) => fr.id !== friendId));
      fetchFriendsList(); // Update friends list after accepting the request
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleReject = async (friendId) => {
    try {
      await friendService.deleteFriend(friendId);
      setFriendRequests((prev) => prev.filter((fr) => fr.id !== friendId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      searchFriends(query);
    } else {
      setSearchResults([]);
    }
  };

  const searchFriends = async (query) => {
    try {
      const response = await friendService.searchFriends(query);
      console.log('Search results:', response.data);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box
        sx={{
          overflowY: 'scroll',
          height: '100vh',
          width: 320,
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background.default,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Stack p={3} spacing={2}>
          <Typography variant="h5">Bạn bè</Typography>
          <Divider />
          <Typography variant="h6">Danh sách bạn bè</Typography>
          <List>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <ListItem key={friend.id}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={friend.name} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">Không có bạn bè nào.</Typography>
            )}
          </List>
          <Divider />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Lời mời kết bạn
          </Typography>
          <List>
            {friendRequests.map((request) => (
              <ListItem key={request.id}>
                <ListItemAvatar>
                  <Avatar src={request.avatar} />
                </ListItemAvatar>
                <ListItemText primary={request.name} />
                <IconButton onClick={() => handleAccept(request.id)}>
                  <Check size={24} />
                </IconButton>
                <IconButton onClick={() => handleReject(request.id)}>
                  <X size={24} />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Tìm kiếm bạn bè
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm bạn bè..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <MagnifyingGlass size={24} />
                </IconButton>
              ),
            }}
          />
          <List>
            {searchQuery.length > 0 &&
              searchResults.map((result) => (
                <ListItem key={result.id}>
                  <ListItemAvatar>
                    <Avatar src={result.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={result.name} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(result.id)}
                  >
                    Kết bạn
                  </Button>
                </ListItem>
              ))}
          </List>
        </Stack>
      </Box>
    </Stack>
  );
};

export default FriendsPage;
