const initialState = {
    user: {},
    loading: false,
    error: "",
    // role: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "REGISTER_SUCCESS":
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
          loading: false,
        };
      case "REGISTER_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "LOGIN":
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        //   role: action.role,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  