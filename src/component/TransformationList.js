import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

class TransformationList extends Component {
  render() {
    return (
      <div className="transformation-list">
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Multiplier</th>
              <th><Button type="button" onClick={this.props.clearTransformationsHandler} className="small"><Glyphicon glyph="trash" /></Button></th>
            </tr>
          </thead>
          <tbody>
          {this.props.transformations.map((transformation, idx) => (
            <tr key={idx}>
              <td>{transformation.name}</td>
              <td>{transformation.multiplier}</td>
              <td><Button type="button" onClick={this.props.removeTransformationHandler(idx)} className="small"><Glyphicon glyph="minus" /></Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default TransformationList;