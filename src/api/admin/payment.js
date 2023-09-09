import { Axios } from "../connection";

export const deletePayment = async (paymentId) => {
   const response = await Axios.delete('admin/deletePayment', { params: { paymentId } });
   return response;
};