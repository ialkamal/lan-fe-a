/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosWithAuth from '../../utils/axiosWithAuth';
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_DEPLOYED_URL || 'http://localhost:5000';

// Fetches logged in user
export const fetchUser = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/user`)
    .then((response) =>
      dispatch({ type: 'SET_USER', payload: response.data.user })
    )
    .catch(() => toast.error('There was a problem fetching user.'));
};

// Fetches all users
export const fetchUsers = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/admin/users/`)
    .then((response) => dispatch({ type: 'SET_USERS', payload: response.data }))
    .catch(() => toast.error('There was a problem fetching users.'));
};

// Logs out user
export const logOut = (history) => (dispatch) => {
  localStorage.removeItem('token');
  window.history.pushState({ logout_time: Date.now() }, '', '/welcome');
};

// Deletes user
export const deleteUser = (id) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/admin/users/${id}`)
    .then(() => toast.success('User has been deleted.'))
    .catch(() => toast.error('There was a problem deleting the user.'));
};

// Fetches a user's liked posts
export const fetchUsersLikedPosts = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/user/post/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_POSTS', payload: response.data })
    )
    .catch(() =>
      toast.error('Hmmm, there was a problem fetching liked posts.')
    );
};

// Fetches a user's liked comments
export const fetchUsersLikedComments = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/user/comment/like`)
    .then((response) =>
      dispatch({ type: 'SET_USERS_LIKED_COMMENTS', payload: response.data })
    )
    .catch(() =>
      toast.error('Hmmm, there was a problem fetching liked comments.')
    );
};

// Fetches a user's profile, different from auth fetch
export const fetchUserProfile = (userID) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/user/${userID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_USER', payload: response.data })
    )
    .catch(() => toast.error('Hmmm, there was a problem fetching the user.'));
};

// Updates a user's display name
export const updateUserDisplayName = (userDetails, displayName) => (
  dispatch
) => {
  const userID = userDetails.id;
  axiosWithAuth()
    .put(`${BACKEND_URL}/api/user/displayname`, { userID, displayName })
    .then(() => {
      toast.success('Woo! Display name changed to ' + displayName);
      dispatch({ type: 'SET_USER', payload: { ...userDetails, displayName } });
    })
    .catch(() =>
      toast.error('Oh no! there was a problem updating your display name.')
    );
};

// Set a user's onboarded status to true
export const updateOnboardedStatusToTrue = () => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/user/onboard`)
    .then(() => toast.success('Woo! Glad you are here!'))
    .catch(() => toast.error('Oh no! there was a problem.'));
};

// Updates a user's role
export const updateUserRole = (id, role) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/admin/users/${id}/${role}`)
    .then(() => toast.success('Role Successfully Updated'))
    .catch(() => toast.error("There was a problem updating the user's role."));
};

// Sets user track during onboarding
export const setTrack = (track, token) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/user/track`, { track, token })
    .then(() => toast.success('Woo! Track successfully set to ' + track))
    .catch(() => toast.error('Uh oh! There was a problem setting your track.'));
};

// Sets user track in settings
export const setTrackSettings = (userDetails, track) => (dispatch) => {
  const token = localStorage.getItem('token');
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/user/track`, { track, token })
    .then(() => {
      dispatch({ type: 'SET_USER', payload: { ...userDetails, track } });
      toast.success('Woo! Track successfully set to ' + track);
    })
    .catch(() => toast.error('Uh oh! There was a problem setting your track.'));
};

// Fetches all rooms
export const fetchRooms = () => (dispatch) => {
  return axiosWithAuth()
    .get(`${BACKEND_URL}/api/room`)
    .then((response) => {
      dispatch({ type: 'SET_ROOMS', payload: response.data });
    })
    .catch(() => {
      toast.error('Oh no! There was a problem fetching rooms.');
    });
};

// Creates a room
export const createRoom = (room) => (dispatch) => {
  return axiosWithAuth()
    .post(`${BACKEND_URL}/api/room`, { ...room })
    .then(() => toast.success('Room Successfully Created'))
    .catch(() => toast.error('There was a problem creating the room.'));
};

// Updates a room
export const updateRoom = (id, room) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/admin/rooms/${id}`, room)
    .then(() => {
      toast.success('Room Successfully Updated');
    })
    .catch(() => toast.error('There was a problem updating the room.'));
};

// Deletes a room
export const deleteRoom = (id) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/room/${id}`)
    .then(() => toast.success('Room Successfully Deleted'))
    .catch(() => toast.error('There was a problem deleting the room.'));
};

// Creates a post
export const postQuestion = (title, description, room, history) => (
  dispatch
) => {
  return axiosWithAuth()
    .post(`${BACKEND_URL}/api/post/create`, {
      title: title,
      description: description,
      room_id: room,
    })
    .then(() => toast.success('Nice! Your new post was just published.'))
    .catch((err) => console.log(err.response));
};

// Updates a post
export const updatePost = (userID, postID, newDescription) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/post/update/${userID}/${postID}`, {
      newDescription,
    })
    .then(() => toast.success('Your post was successfully updated.'))
    .catch(() => toast.error('Oh no! There was a problem updating your post.'));
};

// Deletes a post
export const deletePost = (postID) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/post/delete/${postID}`)
    .then(() => toast.success('Your post was successfully deleted.'))
    .catch(() => toast.error('Hmm, there was a problem deleting your post.'));
};

// Fetches posts based on user search input
export const fetchSearch = (search) => (dispatch) => {
  axiosWithAuth()
    .post(`${BACKEND_URL}/api/post/search`, { search })
    .then((response) => {
      dispatch({ type: 'SET_POSTS', payload: response.data });
    })
    .catch(() => toast.error('Oh no! There was a problem fetching posts.'));
};

// Fetches a post
export const fetchPost = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST' });
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/post/${postID}`)
    .then((response) =>
      dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
    )
    .catch(() =>
      toast.error('Uh... looks like there was a problem fetching the post.')
    );
};

// Fetches posts, ordered by most recent
export const fetchRecent = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/post/recent`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast.error('Shoot, there was a problem fetching posts.'));
};

// Fetches posts, ordered by number of likes
export const fetchPopular = () => (dispatch) => {
  axiosWithAuth()
    .post(`${BACKEND_URL}/api/post/popular`)
    .then((response) => dispatch({ type: 'SET_POSTS', payload: response.data }))
    .catch(() => toast.error('Uh oh! There was a problem fetching posts.'));
};

// Likes a post
export const like = (postID) => (dispatch) => {
  return axiosWithAuth()
    .get(`${BACKEND_URL}/api/post/like/${postID}`)
    .then(() => {})
    .catch(() => toast.error('Oh no! There was a problem liking this post.'));
};

// Removes like from a post
export const unlike = (postID) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/post/like/${postID}`)
    .then(() => {})
    .catch(() => toast.error('Hmm, there was a problem unliking this post.'));
};

// Creates a comment
export const postComment = (user, postID, comment) => (dispatch) => {
  return axiosWithAuth()
    .post(`${BACKEND_URL}/api/comment`, { postID, comment })
    .then(() => {
      toast.success('Sweet! Comment added.');
    })
    .catch(() => toast.error('Hmm, there was a problem adding your comment'));
};

// Likes a comment
export const likeComment = (commentID) => (dispatch) => {
  return axiosWithAuth()
    .get(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then(() => {})
    .catch(() =>
      toast.error('Oh no! There was a problem liking this comment.')
    );
};

// Removes like from a comment
export const unlikeComment = (commentID) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/comment/like/${commentID}`)
    .then(() => {})
    .catch(() =>
      toast.error('Uh oh! There was a problem unliking this comment.')
    );
};

// Fetches a post's comments, ordered by recent
export const fetchPostCommentsByRecent = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  return axiosWithAuth()
    .get(`${BACKEND_URL}/api/comment/recent/${postID}`)
    .then((response) => {
      dispatch({
        type: 'SET_CURRENT_POST_COMMENTS',
        payload: response.data,
      });
    })
    .catch(() => toast.error('Looks like there was trouble loading comments.'));
};

// Fetches a post's comments, ordered by number of likes
export const fetchPostCommentsByPopular = (postID) => (dispatch) => {
  dispatch({ type: 'START_FETCHING_CURRENT_POST_COMMENTS' });
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/comment/popular/${postID}`)
    .then((response) => {
      dispatch({ type: 'SET_CURRENT_POST_COMMENTS', payload: response.data });
    })
    .catch(() => toast.error('Looks like there was trouble loading comments.'));
};

// Fetches all posts in a specific room
export const fetchPostByRoom = (roomID, page) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/room/${roomID}/recent?page=${page}&limit=10`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data.posts });
    })
    .catch(() => toast.error('Oh no! Could not fetch posts.'));
};

// Fetches all posts in a specific room
export const fetchPostByRoomByPopular = (roomID, page) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/room/${roomID}/popular?page=${page}&limit=10`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() => toast.error('Oh no! Could not fetch posts.'));
};

// Updates search state
export const setSearch = (search) => (dispatch) => {
  dispatch({ type: 'SET_SEARCH', payload: search });
};

export const retrieveFullSearchResults = (search) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/search/full/${search}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: 'SET_FULL_SEARCH', payload: res.data });
    })
    .catch(() => toast.error('Oh no! Could not retrieve search results.'));
};

export const flagPost = (id, reason, note) => (dispatch) => {
  axiosWithAuth()
    .post(`${BACKEND_URL}/api/mod/posts/${id}`, { reason: reason, note: note })
    .then(() => {
      toast.success(
        `Thanks! That post was successfully flagged as "${reason}"`
      );
    })
    .catch(() => {
      toast.error('Hmm... That post could not be flagged');
    });
};

export const flagComment = (id, reason, note) => (dispatch) => {
  axiosWithAuth()
    .post(`${BACKEND_URL}/api/mod/comments/${id}`, {
      reason: reason,
      note: note,
    })
    .then(() => {
      toast.success(
        `Thanks! That comment was successfully flagged as "${reason}"`
      );
    })
    .catch(() => {
      toast.error('Hmm... That comment could not be flagged');
    });
};

// Fetches flagged posts
export const fetchFlaggedPosts = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/mod/posts/flagged`)
    .then((res) => {
      dispatch({ type: 'SET_FLAGGED_POSTS', payload: res.data });
    })
    .catch(() => toast.error('There was a problem fetching flagged posts.'));
};

// Fetch all posts in a room, flag data included
export const fetchPostsAndFlagsByRoom = (roomID, pageNumber) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/mod/posts/${roomID}`)
    .then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data });
    })
    .catch(() =>
      toast.error('There was a problem fetching flagged post information.')
    );
};

// Fetches flagged comments
export const fetchFlaggedComments = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/mod/comments/flagged`)
    .then((res) => {
      dispatch({ type: 'SET_FLAGGED_COMMENTS', payload: res.data });
    })
    .catch(() => toast.error('There was a problem fetching flagged comments.'));
};

//Fetches list of flag reasons (moderator)
export const fetchFlagReasons = () => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/mod/reasons`)
    .then((res) => {
      dispatch({ type: 'FETCH_FLAGREASONS_SUCCESS', payload: res.data });
    })
    .catch((err) => toast.error(err.message));
};

// Archives post (moderator)
export const archivePost = (postID) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then(() => toast.success('Post Successfully Archived'))
    .catch(() => toast.error('Error Archiving Post'));
};

// Archives comment (moderator)
export const archiveComment = (commentID) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then(() => toast.success('Comment Successfully Archived'))
    .catch(() => toast.error('Error Archiving Comment'));
};

// Resolves post (moderator) - keeps post visible
export const resolvePost = (postID) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/mod/posts/${postID}`)
    .then(() => {
      toast.success('The discussion post was approved!');
    })
    .catch(() => toast.error('Error Resolving Post'));
};

// Resolves comment (moderator) - keeps comment visible
export const resolveComment = (commentID) => (dispatch) => {
  return axiosWithAuth()
    .put(`${BACKEND_URL}/api/mod/comments/${commentID}`)
    .then(() => toast.success('Comment Successfully Resolved'))
    .catch(() => toast.error('Error Resolving Comment'));
};

// Removes a comment (user)
export const removeCommentsByUserId = (commentId) => (dispatch) => {
  return axiosWithAuth()
    .delete(`${BACKEND_URL}/api/comment/${commentId}`)
    .then(() => toast.success('Success! Your comment was removed.'))
    .catch(() =>
      toast.error('Oh no! There was an error removing your comment')
    );
};

// fetch comment(user)
export const fetchComments = (commentId) => (dispatch) => {
  axiosWithAuth()
    .get(`${BACKEND_URL}/api/comment/${commentId}`)
    .then(() => {})
    .catch(() =>
      toast.error('Oh no! There was a problem fetching that comment.')
    );
};

export const setDrawerVisibility = (bool) => (dispatch) => {
  dispatch({ type: 'SET_DRAWER_VISIBILITY', payload: bool });
};

export const setNewRoomModalVisibility = (bool) => (dispatch) => {
  dispatch({ type: 'SET_NEW_ROOM_MODAL_VISIBILITY', payload: bool });
};

export const setShowFlagModal = (bool) => (dispatch) => {
  dispatch({ type: 'SET_SHOW_FLAGGING_MODAL', payload: bool });
};

export const setShowModModal = (bool) => (dispatch) => {
  dispatch({ type: 'SET_SHOW_MOD_MODAL', payload: bool });
};
