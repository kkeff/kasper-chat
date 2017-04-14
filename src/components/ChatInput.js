import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage = ''
    }
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  return (
    const that = this;
    <form className="blue" onSubmit={() => {props.handleSubmit(this.state.newMessage)})}>
      <label>props.name</label>
      <input type="text" />
      <input type="submit" value="Send" onChange={that.handleChange}/>
    </form>
  );
}
