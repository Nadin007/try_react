import React, { useState } from 'react';

interface ILandPageProps {
    onLoginShow: () => void;
}

export function LandPage(props: ILandPageProps) {
    return <>
    <header>
        <button  className="btn btn-success" onClick={props.onLoginShow}>Sign in</button>
    </header>
    <main></main>
    <footer></footer>
    </>;
}