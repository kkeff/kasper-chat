import React from 'react';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Kaspers',
    };
  }

  render (){
    return (
      <div>
      {this.state.name}
      </div>
    );
  }
};


export default AppContainer;
