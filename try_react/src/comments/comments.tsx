import React, { useState } from 'react';
import { Comment, IComment } from '../comment/comment';

interface ICommentsProps {
    comments: IComment[];
}

export function Comments (props: ICommentsProps) {
    return <>
    {props.comments.map((comment) => <Comment key={ comment.id } comment={comment}></Comment>)}
    </>
}