import React, {useState, useRef} from "react";
import { ClassCounter } from "./components/ClassCounter";
import { Counter } from './components/Counter';
import { PostItem } from "./components/PostItem";
import { PostList } from "./components/PostList";
import { MyButton } from "./components/ui/button/MyButton";
import { MyInput } from "./components/ui/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'description'},
    {id: 2, title: 'JavaScript', body: 'description'},
    {id: 3, title: 'JavaScript', body: 'description'}
  ]);
  const [ title, setTitle ] = useState('');
  const [body, setBody] = useState('')
  const boddyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body
    }
    console.log(newPost);
    setPosts([...posts, newPost])
    setBody('')
    setTitle('')
  }


  return (
    <div className="App">
      <form>
        <MyInput 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text' 
          placeholder="post header"
        />
        <MyInput 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type='text' 
          placeholder="post header"
        />
        <MyButton onClick={addNewPost}>add new post</MyButton>
      </form>
      <PostList posts={posts} title={posts.title}/>
    </div>
     
  );
}

export default App;
