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

export type EventResponse = BaseResponse & {
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
  data: EventResponse['data'][];
};

export type UserEventsResponse = BaseResponse & {
  data: EventResponse['data'][];
};

export type EditEventResponse = BaseResponse;

export type DeleteEventResponse = BaseResponse;

export type TicketResponse = BaseResponse & {
  data: {
    _id: string;
    event: string;
    price: number;
    seat: string;
    available: boolean;
    consumed: boolean;
  }
};

export type AllTicketsResponse = BaseResponse & {
  data: TicketResponse['data'][];
}

export type OrderResponse = BaseResponse & {
  data: {
    _id: string;
    user: string;
    event: EventResponse['data'];
    tickets: TicketResponse['data'][];
    totalQuantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  }
}

export type UserOrdersResponse = BaseResponse & {
  data: OrderResponse['data'][];
}

export type TicketUIDGenerateResponse = BaseResponse & {
  data: {
    uid: string;
    info: {
      id: string;
      event: string;
      title: string;
      venue: string;
      unixdatetime: number;
      seat: string;
    }
  }
}

export type TicketConsumeResponse = BaseResponse;

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


/** EVENT OPERATIONS */
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

export const getUserEvents = async (userid: string): Promise<UserEventsResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/events/user/${userid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const getEvent = async (eventid: string): Promise<EventResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/events/${eventid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const editEvent = async (eventid: string, updatedDetails: {
  title: string;
  date: string;
  venue: string;
}): Promise<EditEventResponse> => {
  return axios
    .request({
      method: 'put',
      url: `/events/${eventid}`,
      data: updatedDetails,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const deleteEvent = async (eventid: string): Promise<DeleteEventResponse> => {
  return axios
    .request({
      method: 'delete',
      url: `/events/${eventid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}


/** TICKET OPERATIONS */
export const getEventTickets = async (eventid: string): Promise<AllTicketsResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/events/${eventid}/tickets`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const generateTicketUID = async (eventid: string, ticketid: string): Promise<TicketUIDGenerateResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/events/${eventid}/tickets/${ticketid}/generate`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const consumeTicket = async (eventid: string, ticketid: string, ticketuid: string): Promise<TicketConsumeResponse> => {
  return axios
    .request({
      method: 'put',
      url: `/events/${eventid}/tickets/${ticketid}/consume`,
      data: {
        uid: ticketuid
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}


/** ORDER OPERATIONS */
export const orderTickets = async (eventid: string, tickets: string[]): Promise<AllTicketsResponse> => {
  return axios
    .request({
      method: 'post',
      url: `/events/${eventid}/tickets/order`,
      data: { tickets },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}

export const getUserOrders = async (userid: string): Promise<UserOrdersResponse> => {
  return axios
    .request({
      method: 'get',
      url: `/orders/user/${userid}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    })
}
