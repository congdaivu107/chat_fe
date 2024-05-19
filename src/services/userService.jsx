import request from "../utils/request";

class UserService {
  constructor(req) {
    this.req = req;
  }

  async getUserInfo() {
    return this.req.get("/users");
  }
}

const userService = new UserService(request);
export default userService;
