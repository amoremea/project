import React from 'react'

export const CommentItem = ({cmt}) => {
  console.log(cmt);
  return (
    <div>{cmt.comment}</div>
  )
}
