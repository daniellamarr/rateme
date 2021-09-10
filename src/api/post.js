import ratemeServiceClient from '.';

export const createPost = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'posts',
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

export const fetchAllPosts = async (page = 1, limit = 20) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts?page=${page}&limit=${limit}`,
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

export const fetchAllFollowingPosts = async () => {
  try {
    const response = await ratemeServiceClient({
      url: 'posts/user',
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

export const fetchSinglePost = async (postId) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/${postId}`,
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

export const fetchUserPosts = async (userId) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/${userId}/user`,
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

export const likePost = async (postId) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/${postId}/like`,
      method: 'post',
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    console.log(err.response)
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};

export const dislikePost = async (postId) => {
  try {
    const response = await ratemeServiceClient({
      url: `posts/${postId}/dislike`,
      method: 'post',
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
