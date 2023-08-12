import { Axios } from "../connection";

export const Signin = async (email, password) => {
  
     const response =  await Axios.post('/signin',
       { email, password })
       return response;

};
