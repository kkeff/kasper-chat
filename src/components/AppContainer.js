import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
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
    }
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

  handleSubmit(){

  }

  render (){
    const that = this;
    return (
      <div className="black">
      <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
      <ChatInput user={that.state.user.name} onSubmit={() => {handleSubmit}></ChatInput>
      </div>
    );
  }
};

export default AppContainer;
