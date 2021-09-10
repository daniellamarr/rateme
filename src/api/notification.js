import ratemeServiceClient from '.';

export const getNotifications = async () => {
  try {
    const response = await ratemeServiceClient({
      url: 'notify',
      method: 'get',
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

export const markAsRead = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `notify/${id}/mark-as-read`,
      method: 'put',
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
