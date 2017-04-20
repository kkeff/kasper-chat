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
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    }

    componentDidMount() {
        // Add listener for
        const that = this;
        setTimeout(function () {
            that.setState((prevState) => ({
                chatMessages: prevState.chatMessages.concat(core.getRandomMessage(that.state.bots))
            }));
        }, 1000);
    }



    componentDidUpdate() {

        const that = this;

        function randomInterval() {
            return Math.floor((Math.random() * 8000) + 5000);
        }

        let timeout = randomInterval();

        setTimeout(function () {
            that.setState((prevState) => ({
                chatMessages: prevState.chatMessages.concat(core.getRandomMessage(that.state.bots))
            }));
            timeout = randomInterval();
        }, timeout);
    }

    handleNewUserMessage(newMessage) {
        const that = this;
        that.setState((prevState) => ({
            chatMessages: prevState.chatMessages.concat({message: newMessage, user: {name: that.state.user.name}})
        }));
    }

    render() {
        const that = this;
        return (
            <div className="container black">
                <div className="row">
                    <div className="col-8">
                        <ChatMessages chatMessages={that.state.chatMessages}></ChatMessages>
                        <ChatInput user={that.state.user.name} onNewUserMessage={this.handleNewUserMessage}></ChatInput>
                    </div>
                    <div className="col-4">
                        <FriendsList friends={that.state.bots}></FriendsList>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContainer;
