import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

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
         <Button href="#"
           key={index}
           className={activeClass}
           onClick={this.handleClick.bind(this, index)}>
           {child.props.label}
         </Button>
     );
   }
   return (
     <ButtonGroup className="tabs__labels" justified>
       {this.props.children.map(labels.bind(this))}
     </ButtonGroup>
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
