import React, { useRef, useState } from 'react'
import { MyInput } from './ui/input/MyInput';
import { MyButton } from './ui/button/MyButton';

export const PostForm = ({create}) => {

  const bodyInputRef = useRef();
  const [post, setPost] = useState({
    title: '', body: '',
  });

  const addNewPost = (e) => {
    e.preventDefault();

    const newpost = {
        ...post,
        id: Date.now()
    }
    create(newpost)

    setPost({title: '', body: ''})
  }

  return (
    <form>
        <MyInput 
          ref={bodyInputRef}
          value={post.title}
          onChange={(e) => setPost({...post, title: e.target.value})}
          type='text' 
          placeholder="post header"
        />
        <MyInput 
          value={post.body}
          onChange={(e) => setPost({...post, body: e.target.value})}
          type='text' 
          placeholder="post header"
        />
        <MyButton onClick={addNewPost}>add new post</MyButton>
      </form>
  )
}
