import Navbar from './Navbar';
import { createClient } from '@supabase/supabase-js';
import './Create.css';

const Edit = ({
  allInputs,
  onInput,
  allPosts,
  resetInput,
  editId,
  search,
  onSearch,
}) => {
  const supabaseUrl = 'https://azjrhfisdxjprqdxnpwc.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6anJoZmlzZHhqcHJxZHhucHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDAwNjcsImV4cCI6MjAxNTY3NjA2N30.mk-xFry6cPpSH3qLt8R59NpwWj6Kx5sfybPQPDRlwmw';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const editPost = async () => {
    const { data, error } = await supabase
      .from('NBA Posts')
      .update({
        title: allInputs[0],
        content: allInputs[1],
        image: allInputs[2],
      })
      .eq('id', editId);
    alert('Post Updated!');
    onInput();
    allPosts();
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
      <section id="form">
        <h1>Edit Post</h1>
        <div className="inputs">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={allInputs[0]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={allInputs[1]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={allInputs[2]}
            onChange={onInput}
          ></input>
        </div>
        <button name="add-button" onClick={editPost}>
          Edit Post
        </button>
      </section>
    </>
  );
};

export default Edit;
