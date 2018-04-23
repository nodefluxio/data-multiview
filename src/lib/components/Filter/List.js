import React, { Component } from "react";
import PropTypes from "prop-types";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      listChild: props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({ listChild: nextProps.data });
    }
  }

  _action = () => {
    return event => {
      let { index } = this.state;
      this.props.action(index, event.target.value);
    };
  };

  _renderChild() {
    let { listChild } = this.state;
    let child = listChild.map((item, i) => {
      if (
        item.text !== '' &&
        item.text != null &&
        item.value !== '' &&
        item.value !== null
      )
        return (
          <option key={i} value={item.value}>
            {item.text}
          </option>
        );
    });
    child.unshift(
      <option key={listChild.length} value={"0"}>
        All
      </option>
    );
    return child;
  }

  render() {
    return (
      <select className="select" onChange={this._action()}>
        {this._renderChild()}
      </select>
    );
  }
}

List.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  data: PropTypes.array,
  action: PropTypes.func
};
