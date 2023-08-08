import { Axios } from "../connection";

export const Signin = async (email, password) => {
    try {
     const response =  await Axios.post('/signin',
       { email, password })
       return response;
    }
      catch (error) {
       console.log(error.response.data.message);
       throw error;
   }
};
