import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import server from '../veryFakeServer';
// Init users
// Listen to change!
//

let friends = server.getInitialFriends();
let messages = server.getInitalMessages();
let user = server.getInitalUser();

renderView(friends, server, user);

function listenToNewMessagesFromServer (messages) {
    messages = messages;
}

function renderView () {
    ReactDOM.render(
        <AppContainer friends={friends} messages={messages} user={user}></AppContainer>,
        document.getElementById('body')
    );
}
