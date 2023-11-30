import axios from "axios";

export const getContactsHistory = async ( userId ) => {
   console.log(userId)
    const response = await axios.post('https://imaa-2585bbde653a.herokuapp.com/chat/',
      {  id: userId })
   return response;
}

export const getChat = async ( userId, secUserId) => {
   const response = await axios.post('https://imaa-2585bbde653a.herokuapp.com/chat/'+secUserId,
      { id: userId })
   return  response;
};