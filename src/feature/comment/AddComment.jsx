import React, { useEffect, useMemo, useState } from "react";
import { useAddCommentMutation, useGetCommentsQuery } from "./commentApiSlice";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import TimeDifferenceDisplay from "../../lib/TimeDifferenceDisplay";

const AddComment = ({ itemId }) => {
  const navigate = useNavigate();
  const { userId } = useToken();

  const { comments } = useGetCommentsQuery("listComments", {
    selectFromResult: ({ data }) => ({
      comments: data?.ids?.map((id) => data?.entities[id]),
    }),
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const commentsByItem = useMemo(() => {
    return comments?.filter((comment) => comment?.item?._id === itemId);
  }, [itemId, comments]);

  const [text, setText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const [addCommentMutation, { isSuccess }] = useAddCommentMutation();

  const handleSubmitComments = async () => {
    try {
      await addCommentMutation({ user: userId, item: itemId, text: text });
    } catch (error) {
      console.error(error);
    }
  };

  const [showTextInput, setShowTextInput] = useState(true);
  useEffect(() => {
    if (isSuccess) {
      setShowTextInput(false);
      setText("");
    }
  }, [isSuccess]);

  return (
    <div className="">
      {!showComments && (
        <>
          {commentsByItem?.length >= 1 && (
            <div
              onClick={() => setShowComments(true)}
              className="text-sky-600 italic hover: underline-offset-4 hover:underline cursor-pointer p-1 pb-3 text-sm"
            >
              {`Show ${commentsByItem?.length || 0} ${
                commentsByItem?.length <= 1 ? "comment" : "comments"
              }`}{" "}
            </div>
          )}
        </>
      )}

      <>
        {showComments && (
          <div className="">
            <p className="px-1 text-blue-600 p-1 text-sm font-semibold underline-offset-4 underline">
              Comments
            </p>
            {commentsByItem?.map((comment) => (
              <div
                key={comment._id}
                className="mb-2 border border-gray-300
            bg-gradient-to-r from-cyan-700 to-gray-200 hover:bg-gradient-to-l hover:from-gray-200 hover:to-indigo-500
            "
              >
                <div className="font-semibold text-white px-1 flex flex-row items-center justify-between ">
                  <div className="flex flex-row items-center justify-around">
                    <span className="text-xs whitespace-nowrap">Posted by</span>
                    <span className="text-sm px-1">🤵‍♂️</span>
                    <span className="text-xs w-full capitalize">
                      {comment?.user?.firstName}
                    </span>
                  </div>

                  <TimeDifferenceDisplay date={comment?.createdAt} />
                </div>
                <p className="w-full overflow-scroll max-h-[4rem] xsm:h-auto  bg-white border border-gray-300 p-1 box-border ">
                  {comment?.text}
                </p>
              </div>
            ))}
          </div>
        )}
        {showComments && (
          <div
            onClick={() => setShowComments(false)}
            className="text-sky-600 italic hover: underline-offset-4 hover:underline cursor-pointer p-1 pb-2 text-sm"
          >
            Hide comments ?
          </div>
        )}
      </>

      {!userId ? (
        <div
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:bg-gradient-to-l from-blue-600 to-rose-400 hover:text-white cursor-pointer  text-center m-3 ml-1 p-1 rounded-md"
        >
          Send your interest ?
        </div>
      ) : (
        <>
          {showTextInput ? (
            <>
              <div className="min-h-[4rem] px-2">
                <textarea
                  itemType="text"
                  required
                  maxLength="200"
                  placeholder="please write your interest here and mention your contact information..."
                  name=""
                  id=""
                  rows="2"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="border border-green-700 rounded-md w-full p-2"
                />
              </div>

              <div className="flex flex-row items-center justify-around">
                <button
                  onClick={() => setShowTextInput(false)}
                  className="bg-blue-600 text-white p-1 w-[4rem] rounded-lg hover:bg-green-600"
                >
                  Cancel
                </button>
                <button
                  disabled={!text}
                  onClick={handleSubmitComments}
                  className={`${
                    text
                      ? "bg-blue-600 text-white  hover:bg-green-600"
                      : "bg-slate-400"
                  }     rounded-lg  p-1 min-w-[4rem] `}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p
              onClick={() => setShowTextInput(true)}
              className="text-sky-600 italic hover: underline-offset-4 hover:underline cursor-pointer p-1  pt-0 mt-0"
            >
              Post more comments ?
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(AddComment);
