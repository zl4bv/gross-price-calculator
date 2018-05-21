import React, { Component } from 'react';
import './App.css';

import { ButtonToolbar } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import AddTransformationButton from './AddTransformationButton';
import ClearTransformationListButton from './ClearTransformationListButton';
import GrossSaleInput from './GrossSaleInput';
import GrossPriceDisplay from './GrossPriceDisplay';
import TransformationList from './TransformationList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grossSales: localStorage.getItem('grossSales') || 0.00,
      transformations: JSON.parse(localStorage.getItem('transformations')) || [],
      grossPrice: localStorage.getItem('grossPrice') || 0.00
    }

    this.handleChangeGrossSales = this.handleChangeGrossSales.bind(this)
    this.handleAddTransformation = this.handleAddTransformation.bind(this)
    this.handleClearTransformations = this.handleClearTransformations.bind(this)
  }

  handleChangeGrossSales(evt) {
    localStorage.setItem('grossSales', evt.target.value)
    this.setState({grossSales: evt.target.value})

    const newGrossPriceValue = this.newGrossPrice(this.state.transformations)
    localStorage.setItem('grossPrice', newGrossPriceValue)
    this.setState({ grossPrice: newGrossPriceValue })
  }

  handleAddTransformation() {
    this.setState({transformations: this.state.transformations.concat({ name: '', multiplier: 1.00 })})
  }

  handleClearTransformations() {
    localStorage.setItem('transformations', JSON.stringify([]))
    this.setState({transformations: []})

    const newGrossPriceValue = this.newGrossPrice(this.state.transformations)
    localStorage.setItem('grossPrice', newGrossPriceValue)
    this.setState({ grossPrice: newGrossPriceValue })
  }

  handleRemoveTransformation = (idx) => () => {
    const newTransformations = this.state.transformations.filter((s, sidx) => idx !== sidx)
    const newGrossPriceValue = this.newGrossPrice(newTransformations)
    localStorage.setItem('grossPrice', newGrossPriceValue)
    localStorage.setItem('transformations', JSON.stringify(newTransformations))
    this.setState({
      transformations: newTransformations,
      grossPrice: newGrossPriceValue
    })
  }

  handleTransformationNameChange = (idx) => (evt) => {
    const newTransformations = this.state.transformations.map((transformation, sidx) => {
      if (idx !== sidx) return transformation
      return { ...transformation, name: evt.target.value }
    })

    localStorage.setItem('transformations', JSON.stringify(newTransformations))
    this.setState({ transformations: newTransformations })
  }

  handleTransformationMultiplierChange = (idx) => (evt) => {
    const newTransformations = this.state.transformations.map((transformation, sidx) => {
      if (idx !== sidx) return transformation
      return { ...transformation, multiplier: evt.target.value }
    })
    const newGrossPriceValue = this.newGrossPrice(newTransformations)

    localStorage.setItem('transformations', JSON.stringify(newTransformations))
    localStorage.setItem('grossPrice', newGrossPriceValue)
    this.setState({
      transformations: newTransformations,
      grossPrice: newGrossPriceValue
    })
  }

  newGrossPrice(transformations) {
    var result = this.state.grossSales
    transformations.forEach((transformation, idx) => {
      result = result * transformation.multiplier
    })
    return result
  }

  render() {
    return (
      <div className="container">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Gross price calculator</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div>
          <Panel>
            <Panel.Heading>Input</Panel.Heading>
            <Panel.Body><GrossSaleInput grossSales={this.state.grossSales} changeGrossSalesHandler={this.handleChangeGrossSales} /></Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>Transformations</Panel.Heading>
            <Panel.Body>
              <TransformationList transformations={this.state.transformations} changeGrossPriceHandler={this.handleChangeGrossPrice} removeTransformationHandler={this.handleRemoveTransformation} transformationNameChangeHandler={this.handleTransformationNameChange} tranformationMultiplierChangeHandler={this.handleTransformationMultiplierChange} />
              <Col sm={12}>
                <ButtonToolbar>
                  <AddTransformationButton addTransformationHandler={this.handleAddTransformation} />
                  <ClearTransformationListButton clearTransformationsHandler={this.handleClearTransformations} />
                </ButtonToolbar>
              </Col>
            </Panel.Body>
            <Panel.Footer><small>For example, to apply a 15% tax to the gross sale amount, add a transformation with the value set to 1.15.</small></Panel.Footer>
          </Panel>
          <Panel>
            <Panel.Heading>Output</Panel.Heading>
            <Panel.Body>
              <GrossPriceDisplay grossPrice={this.state.grossPrice} />
            </Panel.Body>
            <Panel.Footer><small>Gross price is an estimate only. Actual gross price of purchase may vary.</small></Panel.Footer>
          </Panel>
        </div>
      </div>
    )
  }
}

export default App;
