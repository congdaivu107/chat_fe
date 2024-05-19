import request from '../utils/request';

class UserService {
  constructor(req) {
    this.req = req;
  }

  async getUserInfo() {
    return this.req.get('/users');
  }

  async getUserInfoByPhoneNumber(phoneNumber) {
    return this.req.get(`/users/${phoneNumber}/phone`);
  }
}

const userService = new UserService(request);
export default userService;
