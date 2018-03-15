import React, { Component } from "react";
import PropTypes from "prop-types";

import List from "./List";
import _styles from "./styles.scss";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      config: props.config,
      data: props.data,
      resultFilter: [],
      resultSearch: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    let { type, config, data } = this.state;

    if (nextProps.type !== type) {
      this.setState({ type: nextProps.type });
    }
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data });
    }
  }

  _handleFilter = (index, val) => {
    let { resultFilter, resultSearch } = this.state;
    resultFilter[index] = val;
    this.setState({ resultFilter });
    this.props.action({
      filter: resultFilter,
      search: resultSearch
    });
  };

  _handleSearch = e => {
    let { resultFilter } = this.state;
    this.setState({ resultSearch: e.target.value });
    this.props.action({
      filter: resultFilter,
      search: e.target.value
    });
  };

  _renderFilter() {
    let { data, config } = this.state;
    if (config.length === 0 || data.length === 0) {
      return null;
    }

    return data.map((item, i) => {
      if (item.listValue === undefined) {
        return null;
      }

      if (item.listValue.length === 0) return null;

      return (
        <div key={i} className="filter-group">
          <label className="label">{item.title}</label>
          <List data={item.listValue} action={this._handleFilter} index={i} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={_styles.filter_list_wrapper}>
        <div className="filter-wrapper">{this._renderFilter()}</div>
        <div className="custom-search-wrapper">
          <div className="search-group">
            <i className="icon icon-search" />
            <input
              type="text"
              className="custom-search"
              placeholder="Custom search"
              value={this.state.resultSearch}
              onChange={this._handleSearch}
            />
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  type: PropTypes.oneOf(["table", "grid"]),
  config: PropTypes.array,
  data: PropTypes.array,
  action: PropTypes.func
};
