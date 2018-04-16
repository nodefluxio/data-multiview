import React, { Component } from "react";
import moment from "moment";
// import PropTypes from "prop-types";

import Table from "./Table";
import Grid from "./Grid";
import ActionBlock from "../ActionBlock";
import ConfirmDialog from './ConfirmDialog';

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
      enableActionBlock: props.enableActionBlock,
      confirmDialogIndex: null,
      confirmDialogActionName: null,
      confirmDialogData: null
    };
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
    let { index, type, config, data, currentPage, dataPerPage, enableActionBlock } = this.state;

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

    let newFormatData = parsingData(currentData, config, index, actionBlock, this.action);
    switch (type) {
      case "grid":
        return [
          <Grid
            key="1"
            config={config}
            data={newFormatData}
            action={this.action}
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
            data={newFormatData}
            action={this.action}
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

  renderConfirmDialog() {
    let { confirmDialogIndex, confirmDialogActionName, confirmDialogData } = this.state;
    if (confirmDialogIndex == null && confirmDialogActionName == null) {
      return null;
    }
    return <ConfirmDialog index={confirmDialogIndex} actionName={confirmDialogActionName} action={this.actionConfirmDialog} dialog={confirmDialogData} />;
  }

  render() {
    return (
      <div className={_styles.pagination_wrapper}>
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

function parsingData(data, config, indexPath, children, action) {
  let listRow = [];
  data.map((itemData, indexRow) => {
    let listColumn = [];
    config.map((itemConfig, indexColumn) => {
      let columnText = null;
      let columnValue = null;
      let indexValue = null;
      if (itemConfig.text === "Action" && typeof children) {
        columnText = "Action";
        columnValue = [];
        //////////////////////////////
        let tempItemRow = itemData;
        let indexPathValue = indexPath.split("/");
        let indexValue = null;
        for (const x in indexPathValue) {
          if (
            tempItemRow[indexPathValue[x]] !== null &&
            tempItemRow[indexPathValue[x]] !== undefined
          ) {
            let temp_data = tempItemRow[indexPathValue[x]];
            indexValue = temp_data;
          }
        }
        //////////////////////////////
        let tempActions = [];
        if (children.length > 0) {
          children.map((item, itemChildren) => {
            item = React.cloneElement(item, {
              index: indexValue,
              key: itemChildren,
              onAction: action
            });
            tempActions.push(item);
            return null;
          });

        } else {
          tempActions = React.cloneElement(children, {
            index: indexValue,
            onAction: action
          });
        }
        columnValue = tempActions;
      } else {
        //region Get column Text
        let tempItemRow = itemData;
        let textPath = itemConfig.textPath.split("/");
        for (const x in textPath) {
          if (
            tempItemRow[textPath[x]] !== null &&
            tempItemRow[textPath[x]] !== undefined
          ) {
            let temp_data = tempItemRow[textPath[x]];
            tempItemRow = temp_data;
            columnText = temp_data;
          }
        }
        //endregion

        //region Get column Value
        tempItemRow = itemData;
        let valuePath = itemConfig.valuePath.split("/");
        for (const x in valuePath) {
          if (
            tempItemRow[valuePath[x]] !== null &&
            tempItemRow[valuePath[x]] !== undefined
          ) {
            let temp_data = tempItemRow[valuePath[x]];
            tempItemRow = temp_data;
            columnValue = temp_data;
          }
        }
        //endregion

        tempItemRow = itemData;
        let indexPathValue = indexPath.split("/");
        for (const x in indexPathValue) {
          if (
            tempItemRow[indexPathValue[x]] !== null &&
            tempItemRow[indexPathValue[x]] !== undefined
          ) {
            let temp_data = tempItemRow[indexPathValue[x]];
            indexValue = temp_data;
          }
        }

        if (itemConfig.type === "date") {
          columnText = moment(columnText).format("DD MMM YYYY");
          columnValue = moment(columnValue).format("DD MMM YYYY");
        } else if (itemConfig.type === "json") {
          columnText = JSON.stringify(columnText);
          if (columnText === columnValue) {
            columnValue = JSON.stringify(columnValue);
          }
        } else if (itemConfig.type === "datetime") {
          columnText = moment(columnText).format("DD MMM YYYY, HH:mm");
          columnValue = moment(columnValue).format("DD MMM YYYY, HH:mm");
        }
      }

      listColumn.push({ text: columnText, value: columnValue, index: indexValue });
      return null;
    });
    listRow.push(listColumn);
    return null;
  });

  let listRowParsing = [];
  listRow.map((itemRow, indexRow) => {
    let row = [];
    itemRow.map((data, indexData) => {
      let temp = {};
      config.map((itemConfig, indexConfig) => {
        if (indexConfig === indexData) {
          if (itemConfig.text === 'Action') {
            temp.type = 'Action';
            temp.value = data;
          } else {
            temp.type = itemConfig.type;
            temp.value = data;
          }
        }
        return null;
      });
      row.push(temp);
      return null;
    });
    listRowParsing.push(row);
    return null;
  });

  return listRowParsing;
}