import axios, { AxiosResponse } from 'axios';

// User Authentication
export const loginUser = async (credentials: { username: string; password: string }): Promise<AxiosResponse> => {
  return axios
    .request({
      method: 'post',
      url: '/auth/login',
      data: {
        ...credentials
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export const registerUser = async (details: {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
}): Promise<AxiosResponse> => {
  return axios
    .request({
      method: 'post',
      url: '/auth/register',
      data: {
        ...details
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}


// User Operations
// ... export const updatePassword
// ... export const deleteUser 


// User Details Operations
// ... export const getUsersDetails
// ... export const getUserDetails
// ... export const updateUserDetails


// Event Operations
// ... (similar naming pattern for event operations)


// Ticket Operations
// ... (similar naming pattern for ticket operations)


// Order Operations
// ... (similar naming pattern for order operations)