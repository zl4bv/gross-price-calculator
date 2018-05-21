import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class ClearTransformationListButton extends Component {
  render() {
    return (
      <Button type="button" onClick={this.props.clearTransformationsHandler} className="small"><Glyphicon glyph="trash" /> Clear all transformations</Button>
    )
  }
}

export default ClearTransformationListButton;