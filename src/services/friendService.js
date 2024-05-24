import request from '../utils/request';

class FriendService {
  constructor(req) {
    this.req = req;
  }

  async getListFriend(data) {
    return this.req.get('/friends/list', data);
  }

  async getFriendRequests() {
    return this.req.get('/friends');
  }

  async addFriend(senderId, receiverId) {
    return this.req.post('/friends', { senderId, receiverId });
  }

  async acceptFriendRequest(friendId) {
    return this.req.put(`/friends/${friendId}/accept`);
  }

  async deleteFriend(friendId) {
    return this.req.delete(`/friends/${friendId}`);
  }

  async searchFriends(query) {
    return this.req.get(`/friends/search?q=${query}`);
  }
}

const friendService = new FriendService(request);
export default friendService;
