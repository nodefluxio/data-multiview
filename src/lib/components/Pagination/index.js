import React, { Component } from "react";
// import PropTypes from "prop-types";

import Table from "./Table";
import Grid from "./Grid";
import ActionBlock from "../ActionBlock";
import ConfirmDialog from './ConfirmDialog';
import ReactTooltip from 'react-tooltip'
import { debounce, parsingData, pagination } from '../../utils';
import styles from './styles.scss';

export default class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      type: props.type,
      config: props.config,
      data: props.data,
      currentPage: 1,
      dataPerPage: 20,
      enableActionBlock: props.enableActionBlock,
      confirmDialogIndex: null,
      confirmDialogActionName: null,
      confirmDialogData: null,
      width: 0
    };

    this.handleWindowResize = debounce(this.handleWindowResize.bind(this), 100); //delay trigger resize event
  }

  componentWillMount() {
    let { config } = this.state;
    let findAction = config.find(item => {
      return item.text === "Action";
    })
    if (!findAction) {
      config.push({
        text: "Action"
      });
      this.setState({ config });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { config, data, type } = this.state;
    if (nextProps.type !== type) {
      this.setState({ type: nextProps.type });
    }
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data, currentPage: 1 });
    }
  }

  componentDidMount() {
    this.setState({ width: this.refs.pagination_wrapper.clientWidth })
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({ width: this.refs.pagination_wrapper.clientWidth })
  }

  action = (actionName, indexData, confirmDialog, confirmDialogData) => {
    if (confirmDialog) {
      this.setState({ confirmDialogIndex: indexData, confirmDialogActionName: actionName, confirmDialogData });
    } else {
      this.props.onAction(actionName, indexData);
    }
  }

  actionConfirmDialog = (condition, actionName, indexData) => {
    if (condition) {
      this.props.onAction(actionName, indexData);
    }
    this.setState({ confirmDialogIndex: null, confirmDialogActionName: null, confirmDialogData: null })
  }

  clickPage = (val) => {
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

  renderViewType() {
    let { index, type, config, data, currentPage, dataPerPage, enableActionBlock, width } = this.state;

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = pagination(currentPage, Math.ceil(data.length / dataPerPage));
    const renderPageNumbers = pageNumbers.map(number => {
      let func = number === "..." ? null : this.clickPage(number);
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
      <a key={pageNumbers - 1} onClick={this.clickPage('prev')} >
        {'<'}
      </a>
    )

    renderPageNumbers.push(
      <a key={pageNumbers + 1} onClick={this.clickPage('next')} >
        >
      </a>
    )

    let actionBlock = null;
    if (enableActionBlock && !this.props.children) {
      actionBlock = [
        (<ActionBlock key="1" actionName="edit" onAction={this.action}>
          <i className="icon icon-pencil" />
        </ActionBlock>),
        (<ActionBlock key="2" actionName="delete" onAction={this.action} confirmDialog={true}>
          <i className="icon icon-delete" />
        </ActionBlock>)
      ]
    } else if (enableActionBlock && this.props.children) {
      actionBlock = this.props.children;
    }

    let option = [
      { text: "20", value: 20 },
      { text: "50", value: 50 },
      { text: "100", value: 100 }
    ];

    let htmlDataPerPage = option.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      );
    });

    let newFormatData = parsingData(currentData, config, index, actionBlock, this.action, enableActionBlock);
    switch (type) {
      case "grid":
        return [
          <Grid
            key="1"
            config={config}
            data={newFormatData}
            action={this.action}
            index={index}
            width={width}
            rebuildTooltip={this.rebuildTooltip}
          >
            {actionBlock}
          </Grid>,
          <div key="2" className="pagination-wrapper">
            <div className="data-page">
              <select value={dataPerPage} onChange={this.changeDataPerPage()}>
                {htmlDataPerPage}
              </select>
            </div>
            <div className="page-number"><span>Page</span>{renderPageNumbers}</div>
          </div>
        ];
      default:
        return [
          <Table
            key="1"
            config={config}
            data={newFormatData}
            action={this.action}
            index={index}
            enableActionBlock={enableActionBlock}
            width={width}
            rebuildTooltip={this.rebuildTooltip}
          >
            {actionBlock}
          </Table>,
          <div key="2" className="pagination-wrapper">
            <div className="data-page">
              <select value={dataPerPage} onChange={this.changeDataPerPage()}>
                {htmlDataPerPage}
              </select>
            </div>
            <div className="page-number"><span>Page</span>{renderPageNumbers}</div>
          </div>
        ];
    }
  }

  changeDataPerPage = () => {
    return event => {
      this.setState({ dataPerPage: parseInt(event.target.value, 10) });
    };
  };

  renderConfirmDialog() {
    let { confirmDialogIndex, confirmDialogActionName, confirmDialogData } = this.state;
    if (confirmDialogIndex == null && confirmDialogActionName == null) {
      return null;
    }
    return <ConfirmDialog index={confirmDialogIndex} actionName={confirmDialogActionName} action={this.actionConfirmDialog} dialog={confirmDialogData} />;
  }

  rebuildTooltip = () => {
    ReactTooltip.rebuild();
  }

  render() {
    return (
      <div ref="pagination_wrapper" className={styles.pagination_wrapper}>
        <ReactTooltip />
        {this.renderViewType()}
        {this.renderConfirmDialog()}
      </div>
    )
  }
}

Pagination.defaultProps = {
  enableActionBlock: true,
  dataPerPage: 20
};