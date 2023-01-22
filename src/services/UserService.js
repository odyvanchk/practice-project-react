import axios from 'axios';
import Cookies from 'universal-cookie';
import errorInterceptor from "./interceptors/error";
import updateHeaderInterceptor from "./interceptors/updateHeader";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

const httpClient = axios.create({baseURL: USER_API_BASE_URL,});
errorInterceptor(httpClient);
updateHeaderInterceptor(httpClient);

class UserService {
    fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
          .then(FingerprintJS => FingerprintJS.load())
    
    getFingerprint(){
       return this.fpPromise
          .then(fp => fp.get())
        }

    createUser(user){
        const cookie = new Cookies();
        cookie.remove('access')
        return axios.post(USER_API_BASE_URL+"/registration", user);
    }

    // getUserById(userId){
    //     return axios.get(USER_API_BASE_URL + '/' + userId);
    // }

   async loginUser(user) {
        await this.getFingerprint().then(res => {
            user.fingerprint = res.visitorId
         })
         const cookie = new Cookies();
         cookie.remove('access')
         return axios.post(USER_API_BASE_URL + "/auth", user,{ withCredentials: true })
    }


   async updateFromRefresh(){
        let fingerprint;
        await this.getFingerprint().then(res => {
            fingerprint = res.visitorId
           })
        let resp = {"fingerprint" : fingerprint}
        return axios.post(USER_API_BASE_URL + "/auth/refresh", resp, { withCredentials: true })
    }

    helloStudent() {
        return httpClient.get("/lessons/student", {withCredentials : true})
    }

    helloTeacher() {
        return httpClient.get("/lessons/teacher", {withCredentials : true})
    }
}


export default new UserService();

