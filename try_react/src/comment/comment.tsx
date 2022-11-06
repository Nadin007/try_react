import React, { useState } from "react";
import { RepliesButton } from "../repliesButton/repliesButton";
import { Comments } from "../comments/comments";
import './comment.css';
import { dateToHumanReadibleFormat } from "../utils/dateUtils";

interface ICommentProps {
    comment: IComment;
}

interface IUser {
    user_img: string;
    first_name: string;
    last_name: string;
}

export interface IComment {
    id: number;
    user: IUser;
    date: string;
    title: string;
    text: string;
    comments: IComment[];
}

export function Comment (props: ICommentProps) {
    let [isRepliesOpened, setIsRepliesOpened] = useState(false);
    let loadComments = () => {
        setIsRepliesOpened(true);
    };
    return <div className="comment-row row">
        <div className="p-2 col-1">
            <span className="round">
                <img src={props.comment.user.user_img} alt="avatar" className="comment-avatar rounded-circle"/>
            </span>
        </div>
        <div className="comment-text active col">
            <h5>{`${props.comment.user.first_name} ${props.comment.user.last_name}`}</h5>
            <div className="comment-footer">
                <span className="date">{dateToHumanReadibleFormat(props.comment.date)}</span>
            </div>
            <h6>{props.comment.title}</h6>
            <p className="m-b-5 m-t-10">{props.comment.text}</p>
            {isRepliesOpened || props.comment.comments.length === 0 ? undefined : <RepliesButton loadComments={loadComments} comments={props.comment.comments}></RepliesButton>}
            <div>
                {isRepliesOpened && props.comment.comments.length > 0 ? <Comments loadMoreComments={() => {}} amountOfComments={props.comment.comments.length} comments={props.comment.comments}/> : undefined}
            </div>
        </div>
    </div>
}