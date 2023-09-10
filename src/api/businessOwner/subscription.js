import { Axios } from "../connection";

export const deleteSubscriptionRecord = async (subscriptionId) => {
    const response = await Axios.delete('businessOwner/deleteSubscriptionRecord', { params: { subscriptionId } });
    return response;
 };