import Cookies from 'universal-cookie';
import UserService from '../UserService';

const updateHeaderInterceptor = (axiosInstance) => {

    axiosInstance.interceptors.request.use(
       async (config) => { 
            const cookies = new Cookies();
            const jwtToken = cookies.get('access');   
            if (jwtToken && config.url !== "/auth/refresh") {
                config.headers["Authorization"] = "Bearer " + jwtToken;   
            }
            else {
                const originalConfig = config;
                if (originalConfig.url !== "/auth" && originalConfig.url !== "/registration" && originalConfig.url !== "/auth/refresh") {
                    try {
                        let fingerprint;
                        await UserService.getFingerprint()
                            .then(res => {
                                fingerprint = res.visitorId
                            })
                        let resp = {"fingerprint" : fingerprint}
                        await axiosInstance.post( "/auth/refresh", resp, { withCredentials: true })
                            .then( res => {
                                const cookies = new Cookies();
                                cookies.set('access', res.data.token, { path: '/', expires:new Date(Number(res.data.expTime)) });
                                config.headers["Authorization"] = "Bearer " + res.data.token;
                        })

                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return config;
        },
        (error) => {
            Promise.reject(error)
        });
};

export default updateHeaderInterceptor;