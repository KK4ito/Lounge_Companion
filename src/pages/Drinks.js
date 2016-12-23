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
            Drinks: [{ name: 'Feldschloesschen',size: 5, price: 4.0, category: 1, id: 1},
                {name: 'Cola', size: 2.5, price: 3.0, category: 2, id: 2}]
        };
    }
    render() {
        return (
            <Jumbotron>
                <h1>{this.state.Title}</h1>
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
