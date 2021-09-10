import ratemeServiceClient from '.';

export const signup = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'auth/signup',
      method: 'post',
      data,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};

export const login = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'auth/signin',
      method: 'post',
      data,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'auth/forgot-password',
      method: 'post',
      data,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};

export const completeForgotPassword = async (data, token) => {
  try {
    const response = await ratemeServiceClient({
      url: 'auth/forgot-password',
      method: 'put',
      data,
      headers: {
        'x-access-token': token,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};
