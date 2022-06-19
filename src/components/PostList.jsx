import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { PostItem } from './PostItem'

export const PostList = ({posts, title, removePost}) => {
  if(!posts.length) {
    return(
      <h1 style={{textAlign: 'center'}}>
        No More Posts
      </h1>
    )
  }
  return (
    <div>
         <h1 style={{textAlign: 'center'}}>{title}</h1>
         <TransitionGroup>
          {
            posts.map((item, index) => (
              <CSSTransition
              key={item.id}
              timeout={500}
              classNames="post"
              >
                <PostItem remove={removePost} post={item} number={index + 1}/>
              </CSSTransition>
             ))
          }
         </TransitionGroup>
    </div>
  )
}
