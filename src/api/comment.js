import ratemeServiceClient from '.';

export const createComment = async (data, postId) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/comments/${postId}`,
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

export const fetchComments = async (postId, lastId, limit) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/comments/${postId}?lastId=${lastId}&limit=${limit}`,
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
