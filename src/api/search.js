import ratemeServiceClient from '.';

export const search = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'search',
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
