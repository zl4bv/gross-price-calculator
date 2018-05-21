import React, { Component } from 'react';
import './App.css';

import { Navbar } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import AddTransformationForm from './AddTransformationForm';
import GrossSaleInput from './GrossSaleInput';
import GrossPriceDisplay from './GrossPriceDisplay';
import TransformationList from './TransformationList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grossPurchasePrice: 0.00,
      grossSalePrice: 0.00,
      transformations: JSON.parse(localStorage.getItem('transformations')) || []
    }

    this.handleChangeGrossSalePrice = this.handleChangeGrossSalePrice.bind(this)
    this.handleAddTransformation = this.handleAddTransformation.bind(this)
    this.handleClearTransformations = this.handleClearTransformations.bind(this)
  }

  handleChangeGrossSalePrice(evt) {
    this.setGrossSalePrice(evt.target.value)
  }

  handleAddTransformation(transformation) {
    this.setTransformations(this.state.transformations.concat(transformation))
  }

  handleClearTransformations() {
    this.setTransformations([])
  }

  handleRemoveTransformation = (idx) => () => {
    this.setTransformations(this.state.transformations.filter((s, sidx) => idx !== sidx))
  }

  setGrossPurchasePrice(newValue) {
    this.setState({ grossPurchasePrice: newValue })
  }

  setGrossSalePrice(newValue) {
    this.setState({ grossSalePrice: newValue }, this.updateGrossPurchasePrice)
  }

  setTransformations(newTransformations) {
    localStorage.setItem('transformations', JSON.stringify(newTransformations))
    this.setState({ transformations: newTransformations }, this.updateGrossPurchasePrice)
  }

  updateGrossPurchasePrice() {
    const result = this.state.transformations.reduce((result, transformation) => {
      return result * transformation.multiplier
    }, parseFloat(this.state.grossSalePrice))
    this.setGrossPurchasePrice(result || 0)
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
            <Panel.Body><GrossSaleInput grossSales={this.state.grossSalePrice} changeGrossSalesHandler={this.handleChangeGrossSalePrice} /></Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>Transformations</Panel.Heading>
            <Panel.Body>
              <TransformationList transformations={this.state.transformations} clearTransformationsHandler={this.handleClearTransformations} removeTransformationHandler={this.handleRemoveTransformation} />
              <AddTransformationForm handleAddTransformation={this.handleAddTransformation} />
            </Panel.Body>
            <Panel.Footer><small>For example, to apply a 15% tax to the gross sale amount, add a transformation with the multiplier set to 1.15.</small></Panel.Footer>
          </Panel>
          <Panel>
            <Panel.Heading>Output</Panel.Heading>
            <Panel.Body>
              <GrossPriceDisplay grossPrice={this.state.grossPurchasePrice} />
            </Panel.Body>
            <Panel.Footer><small>Gross price is an estimate only. Actual gross price of purchase may vary.</small></Panel.Footer>
          </Panel>
        </div>
      </div>
    )
  }
}

export default App;
