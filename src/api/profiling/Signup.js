import { Axios } from "../connection";

export const Signup = async (role, firstName, lastName, email, phoneNumber, password) => {
    try {
        const response = await Axios.post('/signup', {
            role,
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });
        console.log(response);
        return response;
    
      } catch (error) {
        console.log(error.response.data.message);
        throw error;
    }
};
