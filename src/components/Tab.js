import React from 'react';

export class Tab extends React.Component {

  render() {
    return (
    <div className="background">
      { this.props.children }
    </div>
    );
  }
}
