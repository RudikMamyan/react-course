import React from "react";
import { MyButton } from "./ui/button/MyButton";

export const PostItem = (props) => {
    return(
        <div className="post">
          <div>
          <strong>{props.post.id} {props.post.title}</strong>
          <div>
          {props.post.body}
          </div>
          </div>
        <div>
             <MyButton onClick={() => props.remove(props.post)}>delete</MyButton>
        </div>
      </div>
    )
}