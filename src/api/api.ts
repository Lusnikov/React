import axios, { AxiosError, AxiosResponse } from "axios";

 const BASE_URL = "http://localhost:5010"
 


const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },

    
})


$api.interceptors.request.use(function (config:any) {
    config.headers.Authorization =  `Bearer: ${localStorage.getItem('access')}`;
    return config;
});

$api.interceptors.response.use(async (response: AxiosResponse) =>{
   return response
}, async (err) =>{
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            const res = await  axios.post(BASE_URL+'/user/refresh');
            return $api(originalRequest)
        } catch(error){     
        }
       
    } 
    throw err
    
})

// (e) =>{
//     $api.get<Menu[]>('/product/getMenu',{withCredentials: true})
//     .then(e => e.data)
//     .then(e => e.map(e => {
//       if (e.ingridients !== null){
//           e.ingridients.map(e =>{
//             console.log(e.idIngridient)
//           })
//       }
//     }))
//   }
export {
    $api,
    BASE_URL
}