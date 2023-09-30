import { Axios } from "../connection";

export const addAgent = async ( business , name , voice) => {
    const response = await Axios.post('marketingAgent/addAgent',
      {  business , name , voice })
   return response;
}

export const updateAgent = async ( agentId , business , name , voice) => {
   const response = await Axios.put('marketingAgent/updateAgent',
      { agentId , business , name , voice })
   return response;
};

export const deleteAgent = async (agentId) => {
   const response = await Axios.delete('marketingAgent/deleteAgent', { params: { agentId } });
   return response;
};