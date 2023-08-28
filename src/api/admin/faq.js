import { Axios } from "../connection";

export const addFAQ = async ( question , answer )=> {

   const response = await Axios.post('admin/addFAQ', 
     { question , answer })
      return response;
   } 

export const updateFAQ = async ( FaqId , question , answer ) => {
   const response = await Axios.put('admin/updateFAQ', 
     { FaqId , question , answer })
      return response;
   };

export const deleteFAQ = async (FaqId) => {
      const response = await Axios.delete('admin/deleteFAQ', {params: {FaqId}});
      return response;
   };