import React from 'react';
import PropTypes from 'prop-types';
import constants from '../util/constants';

export default class ChatMessages extends React.Component {

      scrollToBottom() {
        const scrollHeight = this.chatMessages.scrollHeight;
        const height = this.chatMessages.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.chatMessages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }

      componentDidUpdate() {
        this.scrollToBottom();
      }


    render() {
      function ChatMessage({chatMessage}) {

          let messageClasses = 'message ';
          if (chatMessage.user.status === constants.status.ONLINE) {
              messageClasses = messageClasses + 'online-color';
          }
          else if (chatMessage.user.status === constants.status.IN_GAME) {
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
          <div className="chat-messages"
               ref={(div) => {this.chatMessages = div;}}>
              {this.props.chatMessages.map(function (cm, i) {
                  return <ChatMessage chatMessage={cm} key={i}></ChatMessage>;
              })}
          </div>
      );
    }
}
ChatMessages.propTypes = {
    chatMessages: PropTypes.array
};
