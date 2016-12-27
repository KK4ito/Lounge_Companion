import React from 'react';

export class Tab extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
