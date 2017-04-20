import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import FriendsList from './FriendsList';
import serverMaker from '../../veryFakeServer/server'

const server = serverMaker();

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    }


    handleNewUserMessage(newMessage) {
        const that = this;
        server.updateNewMessage(that.props.user, newMessage);
        // Send message to server!
        // Add message to state directly
        // When new message has been activated - then ignore message from own user!
        // that.setState((prevState) => ({
        //    chatMessages: prevState.chatMessages.concat({message: newMessage, user: {name: that.state.user.name}})
        // }));
    }

    render() {
        const that = this;
        return (
            <div className="container black">
                <div className="row">
                    <div className="col-8">
                        <ChatMessages chatMessages={that.props.messages}></ChatMessages>
                        <ChatInput user={that.props.user.name} onNewUserMessage={that.handleNewUserMessage}></ChatInput>
                    </div>
                    <div className="col-4">
                        <FriendsList friends={that.props.friends}></FriendsList>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContainer;
