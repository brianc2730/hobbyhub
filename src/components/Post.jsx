import Navbar from './Navbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

const Post = ({
  postInfo,
  onUpvoteChange,
  allPosts,
  onEdit,
  resetInput,
  search,
  onSearch,
}) => {
  const supabaseUrl = 'https://azjrhfisdxjprqdxnpwc.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6anJoZmlzZHhqcHJxZHhucHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDAwNjcsImV4cCI6MjAxNTY3NjA2N30.mk-xFry6cPpSH3qLt8R59NpwWj6Kx5sfybPQPDRlwmw';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [comment, setComment] = useState('');
  const navigate = useNavigate();

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

  const deletePost = async () => {
    const { error } = await supabase
      .from('NBA Posts')
      .delete()
      .eq('id', postInfo.id);
    allPosts();
    alert('Post Deleted!');
    navigate('/');
  };

  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          searchInput={search}
          handleSearch={onSearch}
        />
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
        <div className="icons">
          <div
            id={postInfo.id}
            style={{ display: 'inline' }}
            onClick={onUpvoteChange}
            className="icon"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <p style={{ display: 'inline' }}>{postInfo.upvotes} Upvotes</p>
          </div>
          <div>
            <div
              id={`${postInfo.id}edit`}
              style={{ display: 'inline' }}
              className="icon"
              onClick={onEdit}
            >
              <Link to={`/id${postInfo.id}edit`} className="link">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
            </div>
            <div
              style={{ display: 'inline' }}
              className="icon"
              onClick={deletePost}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
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
