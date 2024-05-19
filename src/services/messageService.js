import request from '../utils/request';

class MessageService {
    constructor(req) {
        this.req = req;
    }

    async getMessageListByConversationId(id) {
        return this.req.get(`/messages/${id}?page=1&limit=5`);
    }
}

const messageService = new MessageService(request);
export default messageService;
