import React, { useState } from 'react';

interface ILandPageProps {
    onLoginShow: () => void;
}

export function LandPage(props: ILandPageProps) {
    return <>
    <header>
        <button onClick={props.onLoginShow}>Sign in</button>
    </header>
    <main></main>
    <footer></footer>
    </>;
}