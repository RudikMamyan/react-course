import React, {useState, useEffect, useRef} from "react";
import '../style/App.css'

import {usePosts} from "../hooks/usePosts";
import {getPageCount} from "../utils/pages";
import {PostList} from "../components/PostList";
import {PostForm} from "../components/PostForm";
import {useObserver} from "../hooks/useObserver";
import {useFetching} from "../hooks/useFetching";
import {PostFilter} from "../components/PostFilter";
import {Loader} from "../components/ui/loader/Loader";
import {MyModal} from "../components/MyModal/MyModal";
import {MySelect} from "../components/ui/select/MySelect";
import {MyButton} from "../components/ui/button/MyButton";
import {Pagination} from "../components/ui/pagination/Pagination";

import PostService from "../Api/postService";

export const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1)
	const [filter, setFilter] = useState({sort: '', query: ''})
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();


	const [fetchPosts, isLoading, error] = useFetching(async () => {
		const response = await PostService.getAll(limit, page)
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useObserver(lastElement, page < totalPages, isLoading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchPosts(limit, page)
	}, [page, limit]);

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
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='elements count'
				option={[
					{value: 5, name: '5',},
					{value: 10, name: '10',},
					{value: 25, name: '25',},
					{value: -1, name: 'show all',},
				]}
			/>
			{error &&
				<h1>error ${error}</h1>
			}
			<PostList removePost={removePost} posts={sortedAndSearchedPosts} title={'Posts About JS'}/>
			<div ref={lastElement} style={{height: 20, background: 'red'}}/>
			{isLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
			}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}