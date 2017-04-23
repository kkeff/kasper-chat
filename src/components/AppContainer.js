import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import * as userUtil from '../util/userUtil'
import * as core from '../core'

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          chatMessages: [],
          friends: userUtil.createInitialFriends(),
          user: userUtil.createInitalUser()
        },
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
        this.setNewMessage = this.setNewMessage.bind(this);
    }

    handleNewUserMessage(message) {
        const that = this;
        that.setNewMessage(core.createChatMessage(message, that.state.user));
        if(core.messageContainsActiveUserName(that.state.friends, message)){
          const conversationChatMessage = core.createConversationChatMessage(that.state.friends, message, that.state.user.name);
          setTimeout(() => { that.setNewMessage(conversationChatMessage) }, 2000);
        }
    }

    handleNewStatus(friend, status) {
        const that = this;
        that.setNewMessage(core.createChatMessage(message, that.state.user));
        if(core.messageContainsActiveUserName(that.state.friends, message)){
          const conversationChatMessage = core.createConversationChatMessage(that.state.friends, message, that.state.user.name);
          setTimeout(() => { that.setNewMessage(conversationChatMessage) }, 2000);
        }
    }

    setNewMessage(newMessage){
      const that = this;
      that.setState((prevState) => ({
        chatMessages: prevState.chatMessages.concat(newMessage)
      }));
    }

    render() {
        const that = this;
        return (
            <div className="container black">
                <div className="row">
                    <div className="col-8">
                        <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
                        <ChatInput user={that.state.user.name} onNewUserMessage={that.handleNewUserMessage}></ChatInput>
                    </div>
                    <div className="col-4">
                        <FriendsList friends={that.state.friends} onNewStatus={that.handleNewUserStatus}></FriendsList>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContainer;
