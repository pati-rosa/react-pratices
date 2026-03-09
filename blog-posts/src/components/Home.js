import React, {useState} from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";
import usePosts from "../hooks/usePosts";

function Home() {

  const { posts, post, errors, setPost, handleCreatePost, handleDeletePost} = usePosts()

  return (
    <div className="text-center ma-20">
      <div>
        <Input post={post} onSetPost={setPost} errors={errors}/>
        <button data-testid="create-button" className="create-button" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      <div className="posts-section">
        <PostDisplay posts={posts} handleDelete={handleDeletePost}/>
      </div>
    </div>
  );
}

export default Home;
