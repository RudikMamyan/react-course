import React from "react";

export const PostItem = (props) => {
    return(
        <div className="post">
            <strong>{props.number} {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
        <div>
             <button onClick={() => props.remove(props.post)}>delete</button>
        </div>
      </div>
    )
}