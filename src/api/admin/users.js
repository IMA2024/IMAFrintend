import { Axios } from "../connection";

export const addUser = async (profilePic , role, firstName, lastName, email, phoneNumber, address, password )=> {

   console.log(profilePic);
   const response = await Axios.post('admin/addUser', 
     { profilePic , role, firstName, lastName, email, phoneNumber, address, password })
      return response;
   } 

export const updateUser = async (userId,role, firstName, lastName, phoneNumber, address) => {
   const response = await Axios.put('admin/updateUser', 
     { userId, role, firstName, lastName, phoneNumber, address })
      return response;
   };

export const deleteUser = async (userId) => {
      const response = await Axios.delete('admin/deleteUser', {params: {userId}});
      return response;
   };