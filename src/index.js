import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import serverMaker from '../veryFakeServer/server';
// Init users
// Listen to change!
//

const server = serverMaker();

let friends = server.getFriends();
let messages = server.getMessages();
let user = server.getUser();

renderView(friends, server, user);

function renderView () {
    ReactDOM.render(
        <AppContainer friends={friends} messages={messages} user={user}></AppContainer>,
        document.getElementById('body')
    );
}

export function listenToNewMessagesFromServer (newMessages) {
    messages = newMessages;
    renderView();
}
