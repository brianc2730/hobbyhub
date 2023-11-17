import Navbar from './Navbar';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = ({ allPosts, sortPosts }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section id="button-bar">
        <p>Sort By: </p>
        <button name="new-button" onClick={sortPosts}>
          Newest
        </button>
        <button name="popular-button" onClick={sortPosts}>
          Most Popular
        </button>
      </section>
      <section>
        {allPosts &&
          allPosts.map((post) => {
            return (
              <Link to={`/id${post.id}`} className="link" key={post.id}>
                <div className="post-card" key={post.id}>
                  <p>
                    Posted{' '}
                    {post['created_date'] +
                      ' ' +
                      post['created_time'].slice(0, 8)}
                  </p>
                  <h3>{post.title}</h3>
                  <p>Upvotes: {post.upvotes}</p>
                </div>
              </Link>
            );
          })}
      </section>
    </>
  );
};

export default Home;
