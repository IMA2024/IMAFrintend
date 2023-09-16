import { Axios } from "../connection";

export const addQuestionnaire = async ( business , questionnaire ) => {
    const response = await Axios.post('businessOwner/addQuestionnaire',
      { business , questionnaire })
   return response;
}

export const updateQuestionnaire = async ( questionnaireId ,  ) => {
   const response = await Axios.put('businessOwner/updateQuestionnaire',
      { questionnaireId,  })
   return response;
};

export const deleteQuestionnaire = async (questionnaireId) => {
   const response = await Axios.delete('businessOwner/deleteQuestionnaire', { params: { questionnaireId } });
   return response;
};