import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import * as userUtil from '../util/userUtil';
import * as messageUtil from '../util/messageUtil';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      friends: userUtil.createInitialFriends(),
      user: userUtil.createInitalUser()
    };
    this.handleNewStatus = this.handleNewStatus.bind(this);
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    this.setNewFriends = this.setNewFriends.bind(this);
    this.setNewMessage = this.setNewMessage.bind(this);
  }

  componentDidMount() {
    const that = this;
    that._randomMessageTimer = setTimeout(() => that.setNewMessage(messageUtil.createGreetingChatMessage(that.state.friends, that.state.user)), 1250);
    that._randomStatusTimer = setTimeout(() => that.setNewFriends(userUtil.getNewFriendsWithNewStatus(this.state.friends)), 20000);
  }

  componentDidUpdate(prevProps, prevState) {
    const that = this;
    if (messageUtil.hasNewMessageBeenAdded(prevState.chatMessages, that.state.chatMessages)) {
      clearTimeout(this._randomMessageTimer);
      this._randomMessageTimer = setTimeout(() => that.setNewMessage(messageUtil.createIdleChatMessage(that.state.friends)), 17500);
    } else if (userUtil.hasFriendStatusChanged(prevState.friends, that.state.friends)){
      clearTimeout(this._randomStatusTimer);
      that._randomStatusTimer = setTimeout(() => that.setNewFriends(userUtil.getNewFriendsWithNewStatus(this.state.friends)), 20000);
    }
  }

  handleNewUserMessage(message) {
    const that = this;
    that.setNewMessage(messageUtil.createChatMessage(message, that.state.user));
    if (messageUtil.messageContainsActiveUserName(that.state.friends, message)) {
      const conversationChatMessage = messageUtil.createConversationChatMessage(that.state.friends, message, that.state.user.name);
      setTimeout(() => that.setNewMessage(conversationChatMessage), 1250);
    }
  }

  handleNewStatus(friend, newStatus) {
    const that = this;
    if (messageUtil.shouldSendGreetingMessage(friend, that.state.friends)) {
      const greetingChatMessage = messageUtil.createGreetingChatMessage(that.state.friends, friend);
      setTimeout(() => that.setNewMessage(greetingChatMessage), 1500);
    }
    const newFriends = userUtil.getFriendsWithNewStatus(friend, newStatus, that.state.friends);
    that.setNewFriends(newFriends);
  }

  setNewFriends(newFriends){
    this.setState({friends: newFriends});
  }

  setNewMessage(newMessage) {
    this.setState((prevState) => ({
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
            <FriendsList friends={that.state.friends} onNewStatus={that.handleNewStatus}></FriendsList>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContainer;
