import { Axios } from "../connection";

export const addExpense = async (  title, business, description,  date, amount , profilePic ) => {
   const response = await Axios.post('admin/addExpense',
      {  title, business, description,  date, amount , profilePic })
   return response;
}

export const deleteExpense = async (expenseId) => {
   const response = await Axios.delete('admin/deleteExpense', { params: { expenseId } });
   return response;
};

export const addRevenue = async (  title, business, description,  date, amount , profilePic ) => {
   const response = await Axios.post('admin/addRevenue',
      {  title, business, description,  date, amount , profilePic })
   return response;
}

export const deleteRevenue = async (revenueId) => {
   const response = await Axios.delete('admin/deleteRevenue', { params: { revenueId } });
   return response;
};