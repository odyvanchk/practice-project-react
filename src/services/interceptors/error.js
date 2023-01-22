import Cookies from 'universal-cookie';
import UserService from '../UserService';

const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {  
        return response
    },
    
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/" && err.response &&
            err.response.status === 401 && err.response.data.errors.msg !== 'Refresh token is not valid') {
            originalConfig._retry = true;
            try {
                let fingerprint;
                await UserService.getFingerprint()
                    .then(res => {
                        fingerprint = res.visitorId
                    })
                let resp = {"fingerprint" : fingerprint}
                const rs =  await axiosInstance.post( "/auth/refresh", resp, { withCredentials: true })
                
                const cookies = new Cookies();
                cookies.set('access', rs.data.token, { path: '/', expires:new Date(Number(rs.data.expTime)) });
              return axiosInstance(originalConfig);

            } catch (_error) {
              return Promise.reject(_error);
            }
        }
        return Promise.reject(err);
      }
)};
     export default errorInterceptor;