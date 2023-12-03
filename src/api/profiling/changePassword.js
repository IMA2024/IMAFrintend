import { Axios } from "../connection";

export const changePassword = async ( userId, currentPassword, newPassword) => {
  
     const response =  await Axios.patch('/changePassword',
       { userId, currentPassword, newPassword })
       return response;

};