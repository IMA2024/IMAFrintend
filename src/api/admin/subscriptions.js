import { Axios } from "../connection";

   export const updateSubscription = async ( title ,  price, limit, description ) => {

    const response = await Axios.put('admin/updateSubscription', 
      {  title , price, limit, description  })
       return response;
    };