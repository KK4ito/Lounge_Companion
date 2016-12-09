/**
 * Created by David on 09/12/2016.
 */
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, ListGroup, ListGroupItem, Accordion, Panel, Table} from 'react-bootstrap';


export default class Drinks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Title: 'Drinks',
            Drinks: [{ name: 'Feldschloesschen',size: 5, price: 0.0, category: 1}]
        };
    }
    render() {
        return (
            <Jumbotron>
                <h1>{this.state.Title}</h1>
                <Accordion>
                    <Panel header="Bier" eventKey="1">
                        <Table responsive>
                            <tr>

                            </tr>
                        </Table>
                    </Panel>
                    <Panel header="Softdrinks" eventKey="2">
                        <ListGroup>
                            <ListGroupItem></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Accordion>
            </Jumbotron>
        );
    }
}
