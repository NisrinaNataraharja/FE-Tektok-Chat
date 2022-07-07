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
    const Url = process.env.REACT_APP_TEKTOK_API;
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
    const Url = process.env.REACT_APP_TEKTOK_API;
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