import axios from "axios";

const registerRequest = () => {
  return { type: "REGISTER_REQUEST" };
};

const registerSuccess = (data) => {
  return { type: "REGISTER_SUCCESS", payload: data };
};

const registerFailure = (error) => {
  return { type: "REGISTER_FAILURE", payload: error };
};


export const register = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_TEKTOK_API_HEROKU;
    dispatch(registerRequest());
    axios
      .post(`${Url}user/register`, data)
      .then((res) => {
        dispatch(registerSuccess(res.data.data));
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(registerFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};


export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_TEKTOK_API_HEROKU;
    axios
      .post(`${Url}user/login`, data)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        // localStorage.setItem("id", res.data.data.id)
        localStorage.setItem("token", res.data.data.token);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};

export const userProfile = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API_HEROKU;
    axios.get(`${Url}user/profile` , {
      headers: { Authorization: `Bearer ${token}` }}).then((res) => {
      resolve(res.data.data);
    });
  });
};

export const getUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API_HEROKU;
    axios.get(`${Url}user/profile` , {
      headers: { Authorization: `Bearer ${token}` }}).then((res) => {
        console.log(res.data);
      dispatch({
        type: "GET_USER",
        payload: res.data.data
      });
    });
  };
};

export const update = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_TEKTOK_API_HEROKU;
    axios
      .put(`${Url}user/update`, data , {
        headers: { Authorization: `Bearer ${token}` }})
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};