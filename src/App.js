import React, {useState, useRef, useMemo} from "react";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { MyInput } from "./components/ui/input/MyInput";
import { MySelect } from "./components/ui/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'html', body: 'description'},
    {id: 2, title: 'Css', body: 'description'},
    {id: 3, title: 'JavaScript', body: 'description'}
  ]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
     if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter((post) => post.title.includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (remove) => {
    setPosts(posts.filter(p => p.id !== remove.id)
    )
  }

  const sortPosts = (sort) => {
      setSelectedSort(sort)
    }
 
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='search...'
        />
       <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='Sort By'
        option={[
          {value: 'title', name: 'By Name'},
          {value: 'body', name: 'By Description'}
        ]}
       />
      </div>
      {
        posts.length
        ? <PostList posts={sortedAndSearchedPosts} removePost={removePost} title={'posts about JS...'}/>
        : <h1 style={{textAlign: "center"}}>No New Posts</h1>
      }
    </div>
     
  );
}

export default App;
