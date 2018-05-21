import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class AddTransformationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      multiplier: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeMultiplier = this.handleChangeMultiplier.bind(this)
    this.handleAddTransformation = this.handleAddTransformation.bind(this)
  }

  handleChangeName(evt) {
    this.setState({ name: evt.target.value })
  }

  handleChangeMultiplier(evt) {
    this.setState({ multiplier: evt.target.value })
  }

  handleAddTransformation() {
    if (this.state.name === '') return
    if (this.state.multiplier === '') return
    if (isNaN(this.state.multiplier)) return

    this.props.handleAddTransformation({ name: this.state.name, multiplier: this.state.multiplier })
    this.setState({ name: '', multiplier: '' })
  }

  render() {
    return (
      <Form inline>
          <FormControl
            type="text"
            placeholder={`Name`}
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          <FormControl
            type="text"
            placeholder={`1.00`}
            value={this.state.multiplier}
            onChange={this.handleChangeMultiplier}
          />
        <Button type="button" onClick={this.handleAddTransformation} className="small"><Glyphicon glyph="plus" /> Add transformation</Button>
      </Form>
    )
  }
}

export default AddTransformationForm;