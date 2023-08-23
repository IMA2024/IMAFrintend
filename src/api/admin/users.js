import { Axios } from "../connection";

export const addUser = async (profilePic , role, firstName, lastName, email, phoneNumber, password )=> {

   const response = await Axios.post('admin/addUser', 
     { profilePic , role, firstName, lastName, email, phoneNumber, password })
      return response;
   } 

export const updateUser = async ( userId, profilePic, role,  firstName, lastName, phoneNumber ) => {
   const response = await Axios.put('admin/updateUser', 
     {  userId, profilePic, role,  firstName, lastName, phoneNumber })
      return response;
   };

export const deleteUser = async (userId) => {
      const response = await Axios.delete('admin/deleteUser', {params: {userId}});
      return response;
   };