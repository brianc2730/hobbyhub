import Navbar from './Navbar';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

const Post = ({ postInfo, onUpvoteChange, allPosts }) => {
  const supabaseUrl = 'https://azjrhfisdxjprqdxnpwc.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6anJoZmlzZHhqcHJxZHhucHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDAwNjcsImV4cCI6MjAxNTY3NjA2N30.mk-xFry6cPpSH3qLt8R59NpwWj6Kx5sfybPQPDRlwmw';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    const { data, error } = await supabase
      .from('NBA Posts')
      .select('comments')
      .eq('id', postInfo.id);

    let existingComments;
    if (data[0].comments === null) {
      existingComments = [];
    } else {
      existingComments = JSON.parse(data[0].comments);
    }

    const newComments = [...existingComments, comment];

    const { newData, newError } = await supabase
      .from('NBA Posts')
      .update({ comments: JSON.stringify(newComments) })
      .eq('id', postInfo.id);

    setComment('');
    allPosts();
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="post-container">
        <p>
          Posted{' '}
          {postInfo['created_date'] +
            ' ' +
            postInfo['created_time'].slice(0, 8)}
        </p>
        <h3>{postInfo.title}</h3>
        <p>{postInfo.content}</p>
        <img src={postInfo.image} alt="Post Image"></img>
        <div
          id={postInfo.id}
          style={{ display: 'inline' }}
          onClick={onUpvoteChange}
        >
          <FontAwesomeIcon className="icons" icon={faThumbsUp} />
        </div>
        <p style={{ display: 'inline' }}>{postInfo.upvotes} Upvotes</p>
        <section className="comments">
          <p>Comments</p>
          {postInfo.comments &&
            JSON.parse(postInfo.comments).map((comment, index) => {
              return (
                <p key={index} className="comment">
                  - {comment}
                </p>
              );
            })}
          <input
            type="text"
            placeholder="Leave A Comment..."
            onChange={handleCommentChange}
            value={comment}
          ></input>
          <button onClick={addComment}>Add Comment</button>
        </section>
      </section>
    </>
  );
};

export default Post;
