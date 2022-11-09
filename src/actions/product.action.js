import axiosInstance from "../helper";

// export const addProduoct = (form) => {
//   return async (dispatch) => {
//     const res = await axios.post(`/product/create`, form);
//     console.log(res);
//   };
// };

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axiosInstance.post(`product/create`, form);
      // if (res.status === 201) {
      //   dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
      //   dispatch(getProducts());
      // } else {
      //   dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      // }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
