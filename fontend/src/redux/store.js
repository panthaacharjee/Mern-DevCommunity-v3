import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";
import {
  addReplyReducer,
  deleteReplyReducer,
  getPostsReducer,
  likeAndUnlikeCommentReducer,
  likeAndUnlikeReducer,
  singlePost,
} from "./reducers/postReducers";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  posts: getPostsReducer,
  likeAndUnlike: likeAndUnlikeReducer,
  post: singlePost,
  likeAndUnlikeComment: likeAndUnlikeCommentReducer,
  createReply: addReplyReducer,
  deleteReply: deleteReplyReducer,
});
const middleware = [thunk];

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
