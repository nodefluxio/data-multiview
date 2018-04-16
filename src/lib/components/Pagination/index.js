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
      dataPerPage: props.dataPerPage,
      enableActionBlock: props.enableActionBlock
    };
  }

  componentWillReceiveProps(nextProps) {
    let { config, data, type, dataPerPage } = this.state;
    if (nextProps.type !== type) {
      this.setState({ type: nextProps.type });
    }
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data, currentPage: 1 });
    }
    if (nextProps.dataPerPage !== dataPerPage) {
      this.setState({ dataPerPage: nextProps.dataPerPage, currentPage: 1 });
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

  _actionView = (indexData) => {
    this.props.onAction('view', indexData);
  }

  _renderViewType() {
    let { index, type, config, data, currentPage, dataPerPage, enableActionBlock } = this.state;

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = pagination(currentPage, Math.ceil(data.length / dataPerPage));
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

    let actionBlock = null;
    if (enableActionBlock && !this.props.children) {
      actionBlock = [
        (<ActionBlock key="1" actionName="edit" onAction={this._action}>
          <i className="icon icon-pencil" />
        </ActionBlock>),
        (<ActionBlock key="2" actionName="delete" onAction={this._action}>
          <i className="icon icon-delete" />
        </ActionBlock>)
      ]
    } else if (enableActionBlock && this.props.children) {
      actionBlock = this.props.children;
    }
    switch (type) {
      case "grid":
        return [
          <Grid
            key="1"
            config={config}
            data={currentData}
            action={this._actionView}
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
            action={this._actionView}
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

Pagination.defaultProps = {
  enableActionBlock: true,
  dataPerPage: 20
};


//pagination algorithm https://gist.github.com/kottenator/9d936eb3e4e3c3e02598 
//danilopolani
function pagination(currentPage, pageCount) {
  let delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    result = [];

  result = Array.from({ length: pageCount }, (v, k) => k + 1)
    .filter(i => i && i >= left && i < right);

  if (result.length > 1) {
    // Add first page and dots
    if (result[0] > 1) {
      if (result[0] > 2) {
        result.unshift('...')
      }
      result.unshift(1)
    }

    // Add dots and last page
    if (result[result.length - 1] < pageCount) {
      if (result[result.length - 1] !== pageCount - 1) {
        result.push('...')
      }
      result.push(pageCount)
    }
  }
  return result;
}