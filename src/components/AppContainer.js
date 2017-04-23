import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import * as userUtil from '../util/userUtil';
import * as core from '../core';
import randomMessageHandlerMaker from '../actions/randomMessageHandler';

const randomMessageHandler = randomMessageHandlerMaker();

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          chatMessages: [],
          friends: userUtil.createInitialFriends(),
          user: userUtil.createInitalUser()
        },
        this.handleNewStatus = this.handleNewStatus.bind(this);
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
        this.setNewMessage = this.setNewMessage.bind(this);
    }

    componentDidMount(){
      const that = this;
      this._randomMessageHandler = setTimeout(() => that.setNewMessage({message: 'asdf', user: {name: 'hej', status: 'ONLINE'}}), 3000);

    }

    componentDidUpdate(prevProps, prevState){
      console.log(prevProps);
      console.log(prevState);
      //if(core.shouldResetNewRandomMessage(prevState, this.state)){
        //randomMessageHandler.resetTimer();
        //randomMessageHandler.();
      //}

    }

    handleNewUserMessage(message) {
        const that = this;
        that.setNewMessage(core.createChatMessage(message, that.state.user));
        if(core.messageContainsActiveUserName(that.state.friends, message)){
          const conversationChatMessage = core.createConversationChatMessage(that.state.friends, message, that.state.user.name);
          setTimeout(() => { that.setNewMessage(conversationChatMessage) }, 2000);
        }
    }

    handleNewStatus(friend, newStatus) {
        const that = this;
        if(core.shouldSendGreetingMessage(friend, newStatus, that.state.friends)){
          const greetingChatMessage = core.createGreetingChatMessage(that.state.friends, friend);
          setTimeout(() => { that.setNewMessage(greetingChatMessage) }, 2000);
        }
        const newFriends = core.getFriendsWithNewStatus(friend, newStatus, that.state.friends);
        that.setState({friends: newFriends});
    }

    setNewMessage(newMessage){
      const that = this;
      that.setState((prevState) => ({
        chatMessages: prevState.chatMessages.concat(newMessage)
      }));
      //setTimeout(() => { that.setNewMessage(greetingChatMessage) }, 2000);
/*
      var myVar;

      function myFunction() {
          myVar = setTimeout(() => { that.setNewMessage }, 3000);
      }

      function myStopFunction() {
          clearTimeout(myVar);
      }
*/
    }

    render() {
        const that = this;
        return (
          <div>
            <div className="container black">
                <div className="row">
                    <div className="col-8">
                        <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
                        <ChatInput user={that.state.user.name} onNewUserMessage={that.handleNewUserMessage}></ChatInput>
                    </div>
                    <div className="col-4">
                        <FriendsList friends={that.state.friends}
                                     onNewStatus={that.handleNewStatus}></FriendsList>
                    </div>
                </div>
            </div>
            <div>
              <span>time to next</span>
            </div>
            </div>
        );
    }
}

export default AppContainer;
