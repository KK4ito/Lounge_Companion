import React from 'react';
/**
 *  Tab class for the main page
 */
export class Tab extends React.Component {

  render() {
    return (
    <div className="background">
      { this.props.children }
    </div>
    );
  }
}
