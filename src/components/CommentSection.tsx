import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addComment,
  addReply,
  TaskActionTypes,
} from '../redux/actions/taskActions.ts';
import { Comment } from '../redux/reducers/taskReducer.ts';
import { Dispatch } from 'redux';
import styles from '../styles/CommentSection.module.scss';

interface CommentSectionProps {
  taskId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  taskId,
  comments,
  setComments,
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
      setComments([...comments, newComment]);
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
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment,
        ),
      );
    }
  };

  return (
    <div className={styles['comment-section']}>
      <h4>Comments</h4>
      <div className={styles['comment-input']}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter comment"
        />
        <button onClick={handleAddComment}>Add</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <ReplySection
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
  commentId: number;
  replies: Comment[];
  onAddReply: (commentId: number, replyText: string) => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({
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
    <div className={styles['comment-reply']}>
      <div className={styles['comment-input']}>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Enter reply"
        />
        <button onClick={handleAddReply}>Reply</button>
      </div>
      <ul>
        {replies.map((reply) => (
          <li className={styles['comment-input']} key={reply.id}>
            <p>{reply.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
