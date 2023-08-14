import { Axios } from "../connection";

export const addBusiness = async (profilePic, type, name, businessOwner, email, address, phoneNumber, description) => {
   const response = await Axios.post('admin/addBusiness',
      { profilePic, type, name, businessOwner, email, address, phoneNumber, description })
   return response;
}

export const updateBusiness = async ( businessId, profilePic, type, name, businessOwner, address, phoneNumber, description) => {
   const response = await Axios.put('admin/updateBusiness',
      { businessId, profilePic, type, name, businessOwner, address, phoneNumber, description })
   return response;
};

export const deleteBusiness = async (businessId) => {
   const response = await Axios.delete('admin/deleteBusiness', { params: { businessId } });
   return response;
};