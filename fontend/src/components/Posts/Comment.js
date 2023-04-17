import React, { useEffect, useState } from "react";
import {
  addReply,
  deleteComment,
  likeAndUnlikeComment,
} from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import Reply from "./Reply";
import ReactTimeAgos from "../CustomComponent/ReactTimeAgos";

const Comment = ({ val, setSinglePostHidden, postId }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.createReply);

  //Handle Comment Like and Comment
  const [commentLike, setCommentLike] = useState(val.likes.length);
  const [like, setLike] = useState(true);
  const handleCommentLike = (props) => {
    if (props === "like") {
      dispatch(likeAndUnlikeComment(val._id));
      setCommentLike(commentLike + 1);
      setLike(false);
    } else {
      dispatch(likeAndUnlikeComment(val._id));
      setCommentLike(commentLike - 1);
      setLike(true);
    }
  };

  //Handle Reply Comment
  const [allReply, setAllReply] = useState([...val.replies]);
  const [allReplyShow, setAllReplyShow] = useState(false);

  const [replyShow, setReplyShow] = useState(false);
  const [reply, setReply] = useState("");
  const handleReply = () => {
    const myForm = new FormData();
    myForm.set("reply", reply);
    dispatch(addReply(myForm, val._id));
    const replyData = {
      reply: reply,
      user: {
        avatar: {
          url: isAuthenticated && user.avatar.url,
        },
        name: user.name,
        _id: isAuthenticated && user._id,
      },
      createdAt: Date.now(),
    };
    let Arr = [replyData, ...allReply];
    setAllReply(Arr);
    setReplyShow(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (val.likes.includes(user._id)) {
        setLike(false);
      }
    }

    if (!success) {
      let Arr = [...val.replies];
      setAllReply(Arr);
    }
    setReply("");
  }, [user, success]);

  return (
    <>
      <div className="comment-box">
        <img src={val.user && val.user.avatar.url} />
        <div>
          <div className="comment-box-element">
            <div>
              <p>{val.user && val.user.name}</p>
              {isAuthenticated && user._id === val.user._id ? (
                <span onClick={() => dispatch(deleteComment(val._id))}>
                  <AiOutlineDelete />
                </span>
              ) : null}
            </div>
            <p
              style={{
                fontSize: "11px",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              <ReactTimeAgos date={val.createdAt} />
            </p>
            <label>{val && val.comment}</label>
            {val.comment && <br />}
            {val.image && <img src={val.image} alt="" />}
            {commentLike > 0 && (
              <div className="comment-like">
                <span>
                  <FcLike />
                </span>
                <p>{commentLike}</p>
              </div>
            )}
          </div>
          <div className="comment-like-reply-box">
            {like ? (
              <button onClick={() => handleCommentLike("like")}>Like</button>
            ) : (
              <button onClick={() => handleCommentLike("unlike")}>
                Unlike
              </button>
            )}
            <button onClick={() => setReplyShow(!replyShow)}>Reply</button>
          </div>
        </div>
      </div>
      <div className="reply-option-box">
        {replyShow && (
          <div className="create-reply-box">
            <img src={isAuthenticated && user.avatar.url} />
            <div>
              <input
                type="text"
                placeholder="write your reply..."
                onChange={(e) => setReply(e.target.value)}
              />
              <button onClick={handleReply}>Reply</button>
            </div>
          </div>
        )}

        {allReply.length > 0 &&
          (allReplyShow ? (
            <a href="#" onClick={() => setAllReplyShow(false)}>
              hide replies ({allReply.length})
            </a>
          ) : (
            <a href="#" onClick={() => setAllReplyShow(true)}>
              view replies ({allReply.length})
            </a>
          ))}

        {allReplyShow &&
          allReply.map((reply, ind) => {
            return (
              <Reply
                key={ind}
                reply={reply}
                commentId={val._id}
                setSinglePostHidden={setSinglePostHidden}
                postId={postId}
                allReply={allReply}
                setAllReply={setAllReply}
                ind={ind}
              />
            );
          })}
      </div>
    </>
  );
};

export default Comment;
