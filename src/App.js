import React, {useState, useEffect} from "react";
import './style/App.css'
import { MyModal } from "./components/MyModal/MyModal";
import { PostFilter } from "./components/PostFilter";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { MyButton } from "./components/ui/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./Api/postService";
import { Loader } from "./components/ui/loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ modal, setModal ] = useState(false);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState()
  const [ filter, setFilter ] = useState({sort: '', query: ''})
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  let pagesArray = getPagesArray(totalPages) 

  const [ fetchPosts, isLoading, error ] = useFetching(async() => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts()
  }, []);

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
      {
        error && <h1>error ${error}</h1>
      }
      {
        isLoading 
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
          : <PostList posts={sortedAndSearchedPosts} removePost={removePost} title={'Posts About JS...'}/>
      }
      <div className="page__wrapper">
      {
        pagesArray.map(p => 
          <span className="page">{p}</span>
        )
      }
      </div>
    </div>
     
  );
}

export default App;
