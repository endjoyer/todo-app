import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addComment,
  addReply,
  TaskActionTypes,
} from '../redux/actions/taskActions.ts';
import { Comment } from '../redux/reducers/taskReducer.ts';
import { Dispatch } from 'redux';

interface CommentSectionProps {
  taskId: number;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({
  taskId,
  comments,
}) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch<Dispatch<TaskActionTypes>>();

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        text: commentText,
        replies: [],
      };
      dispatch(addComment(taskId, newComment));
      setCommentText('');
    }
  };

  const handleAddReply = (commentId: number, replyText: string) => {
    if (replyText.trim()) {
      const newReply: Comment = {
        id: Date.now(),
        text: replyText,
        replies: [],
      };
      dispatch(addReply(taskId, commentId, newReply));
    }
  };

  return (
    <div>
      <h4>Comments</h4>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Enter comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <ReplySection
              taskId={taskId}
              commentId={comment.id}
              replies={comment.replies}
              onAddReply={handleAddReply}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ReplySectionProps {
  taskId: number;
  commentId: number;
  replies: Comment[];
  onAddReply: (commentId: number, replyText: string) => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({
  taskId,
  commentId,
  replies,
  onAddReply,
}) => {
  const [replyText, setReplyText] = useState('');

  const handleAddReply = () => {
    onAddReply(commentId, replyText);
    setReplyText('');
  };

  return (
    <div>
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Enter reply"
      />
      <button onClick={handleAddReply}>Reply</button>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <p>{reply.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
