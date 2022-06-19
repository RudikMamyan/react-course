import React, {useState, useMemo} from "react";
import './style/App.css'
import { MyModal } from "./components/MyModal/MyModal";
import { PostFilter } from "./components/PostFilter";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { MyButton } from "./components/ui/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'html', body: 'description'},
    {id: 2, title: 'Css', body: 'description'},
    {id: 3, title: 'JavaScript', body: 'description'}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
     if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (remove) => {
    setPosts(posts.filter(p => p.id !== remove.id)
    )
  }
 
  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create User
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList posts={sortedAndSearchedPosts} removePost={removePost} title={'Posts About JS...'}/>
    </div>
     
  );
}

export default App;
