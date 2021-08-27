import { Request } from '@/api/axios/index.js'
export default {
    getProjects() {
        return Request({ url: '/index/projects' });
    }
};