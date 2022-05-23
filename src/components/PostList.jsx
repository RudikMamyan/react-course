import React from 'react'
import { PostItem } from './PostItem'

export const PostList = ({posts, title}) => {
  return (
    <div>
         <h1 style={{textAlign: 'center'}}>{title}</h1>
      {
        posts.map((item, index) => (
          <PostItem post={item} key={item.id} number={index + 1}/>
        ))
      }
    </div>
  )
}
