import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../Api/postService";
import {Loader} from "../components/ui/loader/Loader";

export const PostIdPages = () => {
	const params = useParams();
	console.log(params);
	const [post, setPosts] = useState(params);
	const [comments, setComments] = useState([])
	const [fetchPostById, isLoading, error] = useFetching(async () => {
		const response = await PostService.getById(params.id)
		setPosts(response.data)
	})
	const [fetchComments, isComLoading, comError] = useFetching(async () => {
		const response = await PostService.getCommentsByPostId(params.id);
		setComments(response.data)
	})
	useEffect(() => {
		fetchPostById()
		fetchComments()
	}, [])
	return (
		<div>
			<h1>you are open user page: id = {params.id}</h1>
			{isLoading ? <Loader/> : <div>{post.id}. {post.title}</div>}
			<h1>
				comments
			</h1>
			{
				isComLoading ? <Loader/> : <div>
					{
						comments.map(com =>
							<div key={com.id} style={{marginTop: 15}}>
								<h5>{com.email}</h5>
								<div>{com.body}</div>
							</div>)
					}
				</div>
			}
		</div>
	);
};