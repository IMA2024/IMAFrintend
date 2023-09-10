import { Axios } from "../connection";


export const addNewSubscription = async (type, title, description, price, limit) => {
   const response = await Axios.post('admin/addNewSubscription',
      { type, title, description, price, limit })
   return response;
}

export const updateSubscription = async (title, price, limit, description) => {

   const response = await Axios.put('admin/updateSubscription',
      { title, price, limit, description })
   return response;
};

export const deleteSubscription = async (subscriptionId) => {
   const response = await Axios.delete('admin/deleteSubscription', { params: { subscriptionId } });
   return response;
};

export const deleteSubscriptionRecord = async (subscriptionId) => {
    const response = await Axios.delete('admin/deleteSubscriptionRecord', { params: { subscriptionId } });
    return response;
 };