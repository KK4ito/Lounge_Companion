import React from 'react';
import { Jumbotron, Accordion, Panel, Table } from 'react-bootstrap';

export default class Drinks extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      Title: 'Drinks',
      Drinks: [],
      DrinksServer: [],
      DrinksCategory: [],
      url: 'https://64.137.190.213/LoungeCompanionREST/src/public/index.php'
    };
  }
  // fetch categories and drinks from API
  componentDidMount() {
    fetch( this.state.url + '/drinkcategories', {
      method: 'GET'
    } )
      .then( response => response.json() )
      .then( json => {
        this.setState( {
          DrinksCategory: json
        } );
      } );

    fetch( this.state.url + '/drinks', {
      method: 'GET'
    } )
      .then( response => response.json() )
      .then( json => {
        this.setState( {
          DrinksServer: json
        } );
      } );
  }

  render() {
    return (
    <Jumbotron>
      <h1>{ this.state.Title }</h1>
      <Accordion>
        { this.state.DrinksCategory.map( cat => {
            //create an expandable Table for each drinkcategory
            return <Panel
                          header={ cat.name }
                          eventKey={ cat.id }
                          key={ cat.id }>
                     <Table
                            responsive
                            className="drinkTable">
                       <tbody>
                         { this.state.DrinksServer.filter(d => d.categoryid === cat.id).map( drink => (
                               <tr key={ drink.id }>
                                 <td>
                                   { drink.name }
                                 </td>
                                 <td>
                                   { drink.size }
                                 </td>
                                 <td>
                                   { drink.price }.-
                                 </td>
                               </tr>
                             ))
                             }
                       </tbody>
                     </Table>
                   </Panel>
          } ) }
      </Accordion>
    </Jumbotron>
    );
  }
}
