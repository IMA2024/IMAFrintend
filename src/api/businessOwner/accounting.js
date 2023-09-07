import { Axios } from "../connection";

export const addExpense = async (  title, business, description,  date, amount , profilePic ) => {
   const response = await Axios.post('businessOwner/addExpense',
      {  title, business, description,  date, amount , profilePic })
   return response;
}

export const deleteExpense = async (expenseId) => {
   const response = await Axios.delete('businessOwner/deleteExpense', { params: { expenseId } });
   return response;
};

export const addRevenue = async (  title, business, description,  date, amount , profilePic ) => {
   const response = await Axios.post('businessOwner/addRevenue',
      {  title, business, description,  date, amount , profilePic })
   return response;
}

export const deleteRevenue = async (revenueId) => {
   const response = await Axios.delete('businessOwner/deleteRevenue', { params: { revenueId } });
   return response;
};