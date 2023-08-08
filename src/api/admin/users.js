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
