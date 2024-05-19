import request from '../utils/request';

class ConversationService {
    constructor(req) {
        this.req = req;
    }

    async getConversationList() {
        return this.req.get('/conversations');
    }
}

const conversationService = new ConversationService(request);
export default conversationService;
