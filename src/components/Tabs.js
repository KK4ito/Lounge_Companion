import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';


export class Tabs extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        displayName: 'Tabs',
        selected: 0,
      };
      this._renderTitles=this._renderTitles.bind(this);
      this._renderContent=this._renderContent.bind(this);
  }
  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }

 getDefaultProps() {
   return {
     selected: 0
   };
 }

 handleClick(index, event) {
   event.preventDefault();
   this.setState({
     selected: index
   });
 }
 _renderTitles() {
   function labels(child, index) {
     let activeClass = (this.state.selected === index ? 'active' : '');
     return (
       <li key={index}>
         <a href="#"
           className={activeClass}
           onClick={this.handleClick.bind(this, index)}>
           {child.props.label}
         </a>
       </li>
     );
   }
   return (
     <ul className="tabs__labels">
       {this.props.children.map(labels.bind(this))}
     </ul>
   );
 }
 _renderContent() {
   return (
     <div className="tabs__content">
       {this.props.children[this.state.selected]}
     </div>
   );
 }

}
