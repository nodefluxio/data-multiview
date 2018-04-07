import React, { Component } from "react";
// import PropTypes from "prop-types";

import Table from "./Table";
import Grid from "./Grid";
import ActionBlock from "../ActionBlock";

import _styles from './styles.scss';

export default class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      type: props.type,
      config: props.config,
      data: props.data,
      currentPage: 1,
      dataPerPage: 10,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { config, data } = this.state;
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data, currentPage: 1 });
    }
  }

  _action = (actionName, indexData) => {
    this.props.onAction(actionName, indexData);
  }

  _clickPage = (val) => {
    return event => {
      let { currentPage, data, dataPerPage } = this.state;
      let min = 1;
      let max = Math.ceil(data.length / dataPerPage);
      if (val === 'prev') {
        currentPage = (currentPage - 1) < min ? currentPage : currentPage - 1;
      } else if (val === 'next') {
        currentPage = (currentPage + 1) > max ? currentPage : currentPage + 1;
      } else {
        currentPage = Number(val)
      }
      this.setState({ currentPage });
    }
  }

  _renderViewType() {
    let { index, type, config, data, currentPage, dataPerPage } = this.state;

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    let count = 0;
    data.map((itemData, index) => {
      if (itemData !== null) {
        count++;
      }
      return null;
    })
    const pageNumbers = pagination(currentPage, data.length);
    const renderPageNumbers = pageNumbers.map(number => {
      let func = number === "..." ? null : this._clickPage(number);
      return (
        <a
          key={number}
          onClick={func}
          className={number === currentPage ? 'active' : ''}
        >
          {number}
        </a>
      );
    });

    renderPageNumbers.unshift(
      <a
        key={pageNumbers - 1}
        onClick={this._clickPage('prev')}
      >
        {'<'}
      </a>
    )

    renderPageNumbers.push(
      <a
        key={pageNumbers + 1}
        onClick={this._clickPage('next')}
      >
        >
      </a>
    )

    let actionBlock = [
      (<ActionBlock key="1" actionName="edit" onAction={this._action}>
        <i className="icon icon-pencil" />
      </ActionBlock>),
      (<ActionBlock key="2" actionName="delete" onAction={this._action}>
        <i className="icon icon-delete" />
      </ActionBlock>)
    ]
    switch (type) {
      case "grid":
        return [
          <Grid
            key="1"
            config={config}
            data={currentData}
            action={this._handleAction}
            index={index}
          >
            {actionBlock}
          </Grid>,
          <div key="2" className="pagination">
            <div className="pagination-numbers">
              <span>Page</span>
              {renderPageNumbers}
            </div>
          </div>
        ];
      default:
        return [
          <Table
            key="1"
            config={config}
            data={currentData}
            action={this._handleAction}
            index={index}
          >
            {actionBlock}
          </Table>,
          <div key="2" className="pagination">
            <div className="pagination-numbers">
              <span>Page</span>
              {renderPageNumbers}
            </div>
          </div>
        ];
    }
  }

  render() {
    return (
      <div className={_styles.pagination_wrapper}>
        {this._renderViewType()}
      </div>
    )
  }
}

//pagination algorithm https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}