import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Clearfix } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class TransformationListItem extends Component {
  render() {
    return (
      <Form horizontal>
        <Col sm={4} xs={4}>
          <FormControl
            type="text"
            placeholder={`Name`}
            value={this.props.transformation.name}
            onChange={this.props.transformationNameChangeHandler(this.props.idx)}
          />
        </Col>
        <Col sm={4} xs={4}>
          <FormControl
            type="text"
            placeholder={`1.00`}
            value={this.props.transformation.multiplier}
            onChange={this.props.tranformationMultiplierChangeHandler(this.props.idx)}
          />
        </Col>
        <Col sm={4} xs={4}>
          <Button type="button" onClick={this.props.removeTransformationHandler(this.props.idx)} className="small"><Glyphicon glyph="minus" /></Button>
        </Col>
        <Clearfix />
      </Form>
    )
  }
}

export default TransformationListItem;