import { Axios } from "../connection";

export const addQuestionnaire = async ( business , questionnaire ) => {
    const response = await Axios.post('marketingAgent/addQuestionnaire',
      { business , questionnaire })
   return response;
}

export const deleteQuestionnaire = async (questionnaireId) => {
   const response = await Axios.delete('marketingAgent/deleteQuestionnaire', { params: { questionnaireId } });
   return response;
};