import axios from 'axios';

/** RESPONSE TYPES */

// Common base
type BaseResponse = {
  success: boolean;
  message: string;
}

export type LoginResponse = BaseResponse & {
  data: {
    id: string;
    role: 'user' | 'admin';
  }
};

export type RegisterResponse = BaseResponse;

export type LogoutResponse = BaseResponse;

export type UserDetailsResponse = BaseResponse & {
  data: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
  }
};

export type UpdateUserDetailsResponse = BaseResponse;

export type ChangePasswordResponse = BaseResponse;


/** USER AUTHENTICATION */
export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
  return axios
    .request({
      method: 'post',
      url: '/auth/login',
      data: credentials,
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
}): Promise<RegisterResponse> => {
  return axios
    .request({
      method: 'post',
      url: '/auth/register',
      data: details,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export const logout = async (): Promise<LogoutResponse> => {
  return axios
    .request({
      method: 'delete',
      url: '/auth/logout',
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}


// User Operations
export const updatePassword = async (userid: string, passwords: { currentpassword: string, newpassword: string }): Promise<UserDetailsResponse> => {
  return axios
    .request({
      method: 'put',
      url: `/users/${userid}/password`,
      data: passwords,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}
// ... export const deleteUser


// User Details Operations
// ... export const getUsersDetails

export const getUserDetails = async (userid: string): Promise<UserDetailsResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/userdetails/${userid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const updateUserDetails = async (userid: string, updatedDetails: {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
}): Promise<UpdateUserDetailsResponse> => {
  return axios
    .request({
      method: 'put',
      url: `/userdetails/${userid}`,
      data: updatedDetails,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}


// Event Operations
// ... (similar naming pattern for event operations)


// Ticket Operations
// ... (similar naming pattern for ticket operations)


// Order Operations
// ... (similar naming pattern for order operations)