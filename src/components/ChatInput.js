import React from 'react';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  onSubmit (event) {
    const that = this;
    that.props.onSubmit(that.state.newMessage);
    that.setState({newMessage: ''});
    event.preventDefault();
  }

  render() {
    const that = this;
    return (
      <form className="chat-input col-8" onSubmit={that.onSubmit}>
        <label><strong>{that.props.user}: </strong></label>
        <input type="text" onChange={that.handleChange} value={that.state.newMessage}/>
        <input type="submit" value="Send" />
      </form>
    );
  }
}
