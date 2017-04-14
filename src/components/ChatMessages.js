import React from 'react';

export default function ChatMessages (props) {

  function ChatMessage ({chatMessage}){
    return (
      <div>
        <strong>{chatMessage.user}: </strong>
        <span>{chatMessage.message}</span>
      </div>
    );
  }

  function handleNewMessage(){

  }

  return (
    <div className="red">
    {props.chatMessages.map(function(cm, i){
      return <ChatMessage chatMessage={cm} key={i}></ChatMessage>;
    })}
    </div>
  );
}
