import axios from 'axios';

const base = process.env.VUE_APP_HTTP_API;

export default {
    getInfo(payload) {
        const url = `${ base }/info`;
        return axios.get(url, payload).then(res => res.data);
    }
};
