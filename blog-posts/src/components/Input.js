import React, { useState } from "react";

function Input({ post, onSetPost, errors}) {
  const handleChange = (event) => {
    onSetPost({ ...post,
      [event.target.name] : event.target.value
    })
  }
  return (
    <div className="create-post">
      <input value={post.title} className="input" type="text"  name="title" placeholder="Enter Title" onChange={handleChange} data-testid="title-input" />
      <p className="error" data-testid="error-title">{errors.title}</p>
      <textarea value={post.description} className="input" name="description" placeholder="Enter Description" onChange={handleChange} data-testid="description-input" />
      <p className="error"  data-testid="error-description">{errors.description && errors.description}</p>
    </div>
  );
}

export default Input;
