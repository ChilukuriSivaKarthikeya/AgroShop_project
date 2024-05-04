
export const initialState = {
    loading: false,
    products: [],
    error: null
  };
  
  export const Action_Request = 'Action_Request';
  export const Action_Success = 'Action_Success';
  export const Action_Fail = 'Action_Fail';
  
  export const ProductReducer = (state = initialState, action) => {
    switch(action.type) {
      case Action_Request:
        return { ...state, loading: true };
      case Action_Success:
        return { ...state, loading: false, products: action.payload, error: null };
      case Action_Fail:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  