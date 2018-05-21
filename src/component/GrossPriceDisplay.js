import React, { Component } from 'react';

import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

class GrossPriceDisplay extends Component {
  roundedPrice() {
    return round(this.props.grossPrice, 2)
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Gross price</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl value={this.roundedPrice()} disabled />
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export default GrossPriceDisplay;