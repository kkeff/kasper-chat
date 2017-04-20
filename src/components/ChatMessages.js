import React from 'react';

export default function ChatMessages(props) {

    function ChatMessage({chatMessage}) {

        let messageClasses = 'message ';
        if (chatMessage.user.status === 'ONLINE') {
            messageClasses = messageClasses + 'online-color';
        }
        else if (chatMessage.user.status === 'IN_GAME') {
            messageClasses = messageClasses + 'in-game-color';
        }

        return (
            <div className={messageClasses}>
                <strong>{chatMessage.user.name}: </strong>
                <span>{chatMessage.message}</span>
            </div>
        );
    }

    return (
        <div className="chat-messages">
            {props.chatMessages.map(function (cm, i) {
                return <ChatMessage chatMessage={cm} key={i}></ChatMessage>;
            })}
        </div>
    );
}
