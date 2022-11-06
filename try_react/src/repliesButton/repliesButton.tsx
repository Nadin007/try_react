import React from "react";

interface IRepliesButtonProps {
    comments: unknown[];
    loadComments: () => void;
}

export function RepliesButton (props: IRepliesButtonProps) {
    return <button onClick={props.loadComments} className="btn btn-warning btn-circle text-uppercase"> {props.comments.length} replies</button>;
}