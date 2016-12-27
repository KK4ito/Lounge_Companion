import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, Accordion, Panel, Table} from 'react-bootstrap';

export default class Drinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Title: 'Drinks',
      Drinks: [],
      DrinksServer: [],
      DrinksCategory: [],
      url: 'http://64.137.190.213/LoungeCompanionREST/src/public/index.php'
    };
  }
  componentDidMount(){
    fetch(this.state.url + '/drinkcategories', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({DrinksCategory: json});
    });

    fetch(this.state.url + '/drinks', {
      method: 'GET'
    })
    .then(response=> response.json())
    .then(json => {
      this.setState({DrinksServer: json});
    });
  }
  
  render() {
    return (
      <Jumbotron>
        <h1>{this.state.Title}</h1>
        <Accordion>
          {this.state.DrinksCategory.map(cat => {
            return <Panel header={cat.name} key={cat.id}>
              <Table responsive>
                <tbody>
                  {this.state.DrinksServer.map(drink => {
                    if(drink.categoryid == cat.id){
                      return (
                        <tr key={drink.id}>
                          <td>{drink.name}</td>
                          <td>{drink.size}</td>
                          <td>{drink.price} .-</td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </Table>
            </Panel>
          })}
        </Accordion>
      </Jumbotron>
    );
  }
}
