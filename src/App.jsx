import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Home from './components/Home';
import Create from './components/Create';
import Post from './components/Post';
import './App.css';

const App = () => {
  const supabaseUrl = 'https://azjrhfisdxjprqdxnpwc.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6anJoZmlzZHhqcHJxZHhucHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDAwNjcsImV4cCI6MjAxNTY3NjA2N30.mk-xFry6cPpSH3qLt8R59NpwWj6Kx5sfybPQPDRlwmw';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [inputs, setInputs] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async (e) => {
    if (e && e.target.name === 'new-button') {
      const { data, error } = await supabase
        .from('NBA Posts')
        .select('*')
        .order('created_date', { ascending: false })
        .order('created_time', { ascending: false });
      setPosts(data);
    } else if (e && e.target.name === 'popular-button') {
      const { data, error } = await supabase
        .from('NBA Posts')
        .select('*')
        .order('upvotes', { ascending: false });
      setPosts(data);
    } else {
      const { data, error } = await supabase
        .from('NBA Posts')
        .select('*')
        .order('id');
      setPosts(data);
    }
  };

  const handleUpvotes = async (e) => {
    const id = e.currentTarget.id;
    const { data, error } = await supabase
      .from('NBA Posts')
      .select('*')
      .eq('id', id);

    const currUpvotes = data[0].upvotes;

    const { newData, newError } = await supabase
      .from('NBA Posts')
      .update({ upvotes: currUpvotes + 1 })
      .eq('id', id);
    setPosts(data);
    getPosts();
  };

  const onInputChange = (e) => {
    let newInputs = [...inputs];

    if (!e) {
      newInputs[0] = '';
      newInputs[1] = '';
      newInputs[2] = '';
      setInputs(newInputs);
      return;
    }

    if (e.target.name === 'title') {
      newInputs[0] = e.target.value;
    } else if (e.target.name === 'content') {
      newInputs[1] = e.target.value;
    } else {
      newInputs[2] = e.target.value;
    }

    setInputs(newInputs);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home allPosts={posts} sortPosts={getPosts} />}
        />
        <Route
          path="/create"
          element={
            <Create
              allInputs={inputs}
              onInput={onInputChange}
              allPosts={getPosts}
            />
          }
        />
        {posts &&
          posts.map((post) => {
            return (
              <>
                <Route
                  path={`/id${post.id}`}
                  element={
                    <Post
                      postInfo={post}
                      onUpvoteChange={handleUpvotes}
                      allPosts={getPosts}
                    />
                  }
                />
                <Route
                  path={`/id${post.id}edit`}
                  element={<Post postInfo={post} />}
                />
              </>
            );
          })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
