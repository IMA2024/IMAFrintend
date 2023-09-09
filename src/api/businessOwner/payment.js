import { Axios } from "../connection";

export const deletePayment = async (paymentId) => {
   const response = await Axios.delete('businessOwner/deletePayment', { params: { paymentId } });
   return response;
};