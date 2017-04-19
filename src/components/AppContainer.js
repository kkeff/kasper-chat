import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import * as bots from './../users/bots';
import * as user from './../users/user';
import * as core from './../core';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      bots: bots.createBots(),
      user: user.createUser()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const that = this;
    setTimeout(function(){
      that.setState((prevState) => ({
        chatMessages: prevState.chatMessages.concat(core.getRandomMessage(that.state.bots))
      }));
    }, 1000);
  }

  componentDidUpdate(){
    const that = this;
    function randomInterval(){
      return Math.floor((Math.random() * 8000) + 5000);
    }

    let timeout = randomInterval()

    setTimeout(function(){
      that.setState((prevState) => ({
        chatMessages: prevState.chatMessages.concat(core.getRandomMessage(that.state.bots))
      }));
      timeout = randomInterval();
    }, timeout);
  }

  handleSubmit(newMessage){
    const that = this;
    that.setState((prevState) => ({
      chatMessages: prevState.chatMessages.concat({message: newMessage, user: {name: that.state.user.name}})
    }));
  }

  render (){
    const that = this;
    return (
      <div className="container black">
        <div className="row">
          <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
          <FriendsList friends={that.state.bots}></FriendsList>
        </div>
        <div className="row">
          <ChatInput user={that.state.user.name} onSubmit={this.handleSubmit}></ChatInput>
        </div>
      </div>
    );
  }
};

export default AppContainer;
