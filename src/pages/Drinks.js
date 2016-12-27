/**
* Created by David on 09/12/2016.
*/
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, Accordion, Panel, Table} from 'react-bootstrap';


export default class Drinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Title: 'Drinks',
      //    Drinks: [{ name: 'Feldschloesschen',size: 5, price: 4.0, category: 1, id: 1},
      //        {name: 'Cola', size: 2.5, price: 3.0, category: 2, id: 2}],
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
    .then(result => {
      console.log(result);
      console.log(result.headers);
      console.log(result.body);
      console.log('categoresi');
      this.state.DrinksCategory=result.json();
    });
    fetch(this.state.url + '/drinks', {
      method: 'GET'
    })
    .then(result=> {

      console.log(result);
      console.log('drinks');
      this.state.DrinksServer=result.json();

    });
  }
  /*
  <div>Items:</div>
  { this.state.items.map(item=> { return <div>{http://item.name}</div>}) }
  </div>
  */

  render() {
    return (
      <Jumbotron>
        <h1>{this.state.Title}</h1>
        <Accordion>
          {this.state.DrinksCategory.map(cat=>{
            return <Panel header={cat.name} eventKey={cat.id}>
              <Table responsive>
                <tbody>
                  {this.state.DrinksServer.map(drink=>{
                    if(drink.category == cat.id){
                      return (
                        <tr key={drink.id}>
                          <td>{drink.name}</td>
                          <td>{drink.size}</td>
                          <td>{drink.price}</td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </Table>
            </Panel>
          })}
        </Accordion>
        <Accordion>
          <Panel header="Bier" eventKey="1">
            <Table responsive>
              <tbody>
                {this.state.Drinks.map(function (drink) {
                  if(drink.category == 1){
                    return (
                      <tr key={drink.id}>
                        <td >{drink.name}</td>
                        <td >{drink.size}</td>
                        <td >{drink.price}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </Panel>
          <Panel header="Softdrinks" eventKey="2">
            <Table responsive>
              <tbody>
                {this.state.Drinks.map(function (drink) {
                  if(drink.category == 2){
                    return (
                      <tr key={drink.id}>
                        <td >{drink.name}</td>
                        <td >{drink.size}</td>
                        <td >{drink.price}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </Panel>
        </Accordion>
      </Jumbotron>
    );
  }
}
