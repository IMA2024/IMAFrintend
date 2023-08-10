import { Axios } from "../connection";

// export const viewAllUsers = async () => {
//   try {
//     return await Axios.get('admin/viewAllUsers')
//   } catch (error) {
//     return console.log(error)
//   }
// } 

export const addUser = async (role, firstName, lastName, email, phoneNumber, address, password )=> {
   try{ 
   const response = await Axios.post('admin/addUser', 
     {
      role, firstName, lastName, email, phoneNumber, address, password
      })
      return response;
   }
      catch (error) {
         console.log(error.response.data.message);
         throw error;
    } 
   
}

export const updateUser = async (userId, role, firstName, lastName, phoneNumber, address) => {
   try{ 
   const response = await Axios.put('admin/updateUser', 
     {
      userId, role, firstName, lastName, phoneNumber, address
      })
      return response;
   }
      catch (error) {
         console.log(error.response.data.message);
         throw error;
    } 
   
}

export const deleteUser = async (userId) => {
   try {
      await Axios.delete('admin/deleteUser', {params: {userId}})
   } catch (error) {
      console.log(error)
   }
 }