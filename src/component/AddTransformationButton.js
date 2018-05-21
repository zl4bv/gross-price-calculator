import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class AddTransformationButton extends Component {
  render() {
    return (
      <Button type="button" onClick={this.props.addTransformationHandler} className="small"><Glyphicon glyph="plus" /> Add transformation</Button>
    )
  }
}

export default AddTransformationButton;