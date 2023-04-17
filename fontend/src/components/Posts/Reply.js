import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply } from "../../redux/actions/postActions";
import { CLEAR_ERRORS } from "../../redux/constants/postConstants";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";

const Reply = ({
  reply,
  commentId,
  setSinglePostHidden,
  allReply,
  setAllReply,
  ind,
}) => {
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector((state) => state.deleteReply);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleDeleteReply = () => {
    const myForm = new FormData();
    myForm.set("replyId", reply._id);
    dispatch(deleteReply(myForm, commentId));
  };
  if (error === "Reply Not Found") {
    setSinglePostHidden(false);
    dispatch({ type: CLEAR_ERRORS });
  }
  useEffect(() => {
    if (success) {
      let arr = allReply.filter((index) => index !== ind);
      setAllReply([...arr]);
    }
  }, [success, setAllReply]);

  return (
    <>
      {loading ? (
        <p>Loading...........</p>
      ) : (
        <>
          {isAuthenticated === true ? (
            <div className="reply-box-container">
              <img src={reply.user.avatar.url} />
              <div>
                <div className="reply-box">
                  <div>
                    <p>{reply.user.name}</p>
                    {user._id.toString() === reply.user._id.toString() && (
                      <span onClick={handleDeleteReply}>
                        <AiOutlineDelete />
                      </span>
                    )}
                  </div>
                  <p>
                    <ReactTimeAgos date={reply.createdAt} />
                  </p>
                  <h4>{reply.reply}</h4>
                </div>
                <button>Like</button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Reply;
