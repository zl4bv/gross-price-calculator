import React, { Component } from 'react';

import TransformationListItem from './TransformationListItem';

class TransformationList extends Component {
  render() {
    return (
      <div className="transformation-list">
      {this.props.transformations.map((transformation, idx) => (
        <TransformationListItem key={idx} idx={idx} transformation={transformation} removeTransformationHandler={this.props.removeTransformationHandler} transformationNameChangeHandler={this.props.transformationNameChangeHandler} tranformationMultiplierChangeHandler={this.props.tranformationMultiplierChangeHandler} />
      ))}
      </div>
    )
  }
}

export default TransformationList;