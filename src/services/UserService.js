import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class UserService {
    
    createUser(user) {
        return axios.post(USER_API_BASE_URL+"/registration", user);
    }

    // getUserById(userId){
    //     return axios.get(USER_API_BASE_URL + '/' + userId);
    // }

    loginUser(user) {
        return axios.post(USER_API_BASE_URL + "/auth")
    }
}


export default new UserService();

