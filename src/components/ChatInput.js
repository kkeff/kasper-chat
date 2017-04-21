import React from 'react';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({newMessage: event.target.value});
        event.preventDefault();
    }

    handleSubmit(event) {
        const that = this;
        that.props.onNewUserMessage(that.state.newMessage);
        that.setState({newMessage: ''});
        event.preventDefault();
    }

    render() {
        const that = this;
        // TODO Cannot send empty messsage



        return (
            <form className="chat-input" onSubmit={that.handleSubmit}>
                <label><strong>{that.props.user}: </strong></label>
                <input type="text" onChange={that.handleChange} value={that.state.newMessage}/>
                <input type="submit" value="Send"/>
            </form>
        );
    }
}
