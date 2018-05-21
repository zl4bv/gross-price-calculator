import React, { Component } from 'react';

import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

class GrossSaleInput extends Component {
  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Gross sale amount</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl value={this.props.grossSales} onChange={this.props.changeGrossSalesHandler} />
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export default GrossSaleInput;