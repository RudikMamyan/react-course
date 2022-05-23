import React from "react";

export const PostItem = (props) => {
    return(
        <div className="post">
            <strong>{props.number} {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
        <div>
             <button>delete</button>
        </div>
      </div>
    )
}