import React, {useState, useEffect} from "react";
import '../style/App.css'
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../Api/postService";
import {getPageCount} from "../utils/pages";
import {MyButton} from "../components/ui/button/MyButton";
import {MyModal} from "../components/MyModal/MyModal";
import {PostForm} from "../components/PostForm";
import {PostFilter} from "../components/PostFilter";
import {Loader} from "../components/ui/loader/Loader";
import {PostList} from "../components/PostList";
import {Pagination} from "../components/ui/pagination/Pagination";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState()
	const [filter, setFilter] = useState({sort: '', query: ''})
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [fetchPosts, isLoading, error] = useFetching(async () => {
		const response = await PostService.getAll(limit, page)
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useEffect(() => {
		fetchPosts()
	}, [page]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (remove) => {
		setPosts(posts.filter(p => p.id !== remove.id)
		)
	}

	const changePage = (page) => {
		setPage(page)
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
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default Posts;
