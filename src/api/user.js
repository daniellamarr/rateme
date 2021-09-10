import ratemeServiceClient from '.';

export const fetchUserProfile = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `users/${id}`,
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

export const updateUserProfile = async (data) => {
  try {
    const response = await ratemeServiceClient({
      url: 'auth/update-profile',
      method: 'put',
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

export const followUser = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `users/follow/${id}`,
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

export const unfollowUser = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `users/unfollow/${id}`,
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

export const fetchFollowerCheck = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `users/follower-check/${id}`,
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

export const fetchFollowings = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: `users/followings/${id}`,
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

export const fetchAllUsers = async (id) => {
  try {
    const response = await ratemeServiceClient({
      url: 'users',
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
