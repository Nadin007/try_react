import React, { useState } from 'react';
import { Comment, IComment } from '../comment/comment';

interface ICommentsProps {
    comments: IComment[];
    amountOfComments: number;
    loadMoreComments: () => void;
}

export function Comments (props: ICommentsProps) {
    return <>
    {props.comments.map((comment) => <Comment key={ comment.id } comment={comment}></Comment>)}
    {props.comments.length < props.amountOfComments ? <button onClick={props.loadMoreComments} className="btn btn-warning btn-circle text-uppercase">Load more</button> : undefined}
    </>
}