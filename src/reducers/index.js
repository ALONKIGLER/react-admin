import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
});

export default rootReducer;
