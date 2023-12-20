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

export type AllUserDetailsResponse = BaseResponse & {
  data: UserDetailsResponse['data'][];
};

export type UpdateUserDetailsResponse = BaseResponse;

export type ChangePasswordResponse = BaseResponse;

export type DeleteUserResponse = BaseResponse;

export type CreateEventResponse = BaseResponse;

export type EventsResponse = BaseResponse & {
  data: {
    _id: string;
    title: string;
    date: string;
    venue: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
  }
};

export type AllEventsResponse = BaseResponse & {
  data: EventsResponse['data'][];
};


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


/** USER OPERATIONS */
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
export const deleteUser = async (userid: string): Promise<DeleteUserResponse> => {
  return axios
    .request({
      method: 'delete',
      url: `/users/${userid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

/** USER DETAILS OPERATIONS */
export const getAllUserDetails = async (): Promise<AllUserDetailsResponse> => {
  return axios
    .request({
      method: 'get',
      url: '/userdetails',
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

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
export const createEvent = async (details: {
  title: string;
  date: string;
  venue: string;
  ticketQty: number;
}): Promise<CreateEventResponse> => {
  return axios
    .request({
      method: 'post',
      url: '/events',
      data: details,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const getAllEvents = async (): Promise<AllEventsResponse> => {
  return axios
    .request({
      method: 'get',
      url: '/events',
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}




// Ticket Operations
// ... (similar naming pattern for ticket operations)


// Order Operations
// ... (similar naming pattern for order operations)