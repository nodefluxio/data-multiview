import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import Filter from "../Filter";
import Pagination from '../Pagination';

import _styles from "./styles.scss";
require('../../assets/style.css');
export default class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      type: props.type,
      config: props.config,
      data: props.data,
      dataFilter: props.data,
      enableActionBlock: props.enableActionBlock
    };
  }

  componentWillReceiveProps(nextProps) {
    let { index, config, data, type } = this.state;
    if (nextProps.type !== type) {
      this.setState({ type: nextProps.type });
    }
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data, dataFilter: nextProps.data });
    }
    if (nextProps.index !== index) {
      this.setState({ index });
    }
  }

  _filter = filter => {
    let { config, data } = this.state;
    let filterExist = false;
    let searchVar = null;
    let filterVar = null;
    if (filter != null && filter.length !== 0) {
      filterExist = true;
      searchVar = filter.search;
      filterVar = filter.filter;
    }

    let listRow = {};
    data.map(function (itemData, indexRow) {
      let listColumn = [];
      config.map(function (itemConfig, indexColumn) {
        if (itemConfig.text !== 'Action') {
          let columnText = null;
          let columnValue = null;

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

          if (typeof columnText === 'object' || typeof columnValue === 'object') {
            columnText = '';
            columnValue = '';
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
          } else {
            columnValue = columnValue.toString();
          }
          listColumn.push({ text: columnText, value: columnValue });
        }

        return null;
      });
      // listRow.push(listColumn);
      listRow[indexRow] = listColumn
      return null;
    });

    //region Filter and Search
    let listPassFilter = [];
    if (filterExist) {
      let multiFilter = false;
      let listActiveFilter = [];
      for (let i = 0; i < filterVar.length; i++) {
        if (filterVar[i] !== "0" && filterVar[i] != null) {
          listActiveFilter.push(true);
        }
      }

      if (listActiveFilter.length > 1) {
        multiFilter = true;
      }

      for (let indexRow in listRow) {
        let itemRow = listRow[indexRow];
        // listRow.map((itemRow, indexRow) => {
        let searchCondition = false;
        let filterCondition = [];
        itemRow.map((itemColumn, indexColumn) => {
          //if Select All option active, only check by Custom Search by text
          if (listActiveFilter.length !== 0) {
            //region Filter
            if (
              filterVar[indexColumn] !== undefined &&
              filterVar[indexColumn] !== "0" &&
              filterVar[indexColumn] != null
            ) {
              if (filterVar[indexColumn] === itemColumn.value) {
                filterCondition.push(true);
              } else {
                if (multiFilter) {
                  filterCondition.push(false);
                }
              }
            }
            //endregion
          }

          //region Custom Search by text
          //searchVar no contain character also return true
          if (itemColumn.text !== null) {
            //if itemColumn.text null, no need search
            if (
              itemColumn.text
                .toString()
                .toLowerCase()
                .search(searchVar.toString().toLowerCase()) !== -1
            ) {
              searchCondition = true;
            }
          }
          //endregion
          return null;
        });

        //if Select All option active, only check by Custom Search by text
        if (listActiveFilter.length !== 0) {
          if (multiFilter) {
            if (
              searchCondition &&
              (filterCondition.includes(true) &&
                !filterCondition.includes(false))
            ) {
              listPassFilter.push(indexRow);
            }
          } else {
            if (searchCondition && filterCondition.includes(true)) {
              listPassFilter.push(indexRow);
            }
          }
        } else {
          if (searchCondition) {
            listPassFilter.push(indexRow);
          }
        }
      };

      data = data.filter((item, index) => {
        let pass = false;
        listPassFilter.map(itemFilter => {
          if (parseInt(itemFilter, 10) === index) {
            pass = true;
          }
          return null;
        });
        if (pass) {
          return item;
        }
        return null;
      });
    }
    this.setState({ dataFilter: data })
    //endregion
  };

  _renderFilter() {
    let { type, data, config } = this.state;
    if (config.length === 0 || data.length === 0) {
      return null;
    }

    let listDistinctData = [];
    config.map(function (itemConfig, indexColumn) {
      listDistinctData.push({});
      return null;
    });

    data.map(function (itemData, indexRow) {
      config.map(function (itemConfig, indexColumn) {
        if (itemConfig.type !== 'image') {
          if (itemConfig.textPath === undefined) {
            return null;
          }
          let text;
          let value;

          let tempItemRow = itemData;
          let textPath = itemConfig.textPath.split("/");
          for (const x in textPath) {
            if (
              tempItemRow[textPath[x]] != null &&
              tempItemRow[textPath[x]] !== undefined
            ) {
              let temp_data = tempItemRow[textPath[x]];
              tempItemRow = temp_data;
              text = temp_data;
            }
          }

          tempItemRow = itemData;
          let valuePath = itemConfig.valuePath.split("/");
          for (const x in textPath) {
            if (
              tempItemRow[valuePath[x]] != null &&
              tempItemRow[valuePath[x]] !== undefined
            ) {
              let temp_data = tempItemRow[valuePath[x]];
              tempItemRow = temp_data;
              value = temp_data;
            }
          }

          if (typeof text === 'object' || typeof value === 'object') {
            text = '';
            value = '';
          }

          if (itemConfig.type === "date") {
            text = moment(text).format("DD MMM YYYY");
            value = moment(value).format("DD MMM YYYY");
          } else if (itemConfig.type === "datetime") {
            text = moment(text).format("DD MMM YYYY, HH:mm");
            value = moment(value).format("DD MMM YYYY, HH:mm");
          } else if (itemConfig.type === "json") {
            text = null;
            value = null;
          }

          if (listDistinctData[indexColumn].title === undefined)
            listDistinctData[indexColumn].title = itemConfig.text;

          if (value !== null) {
            if (listDistinctData[indexColumn].listValue === undefined)
              listDistinctData[indexColumn].listValue = [];

            let exist = false;

            listDistinctData[indexColumn].listValue.map(item => {
              if (item.value === value) exist = true;
              return null;
            });

            if (!exist)
              listDistinctData[indexColumn].listValue.push({ text, value });
          }
        }
        return null;
      });
      return null;
    });
    return (
      <Filter
        type={type}
        config={config}
        data={listDistinctData}
        action={this._filter}
      />
    );
  }

  _action = (actionName, indexData) => {
    this.props.onAction(actionName, indexData);
  };

  _renderViewType() {
    let { index, type, config, dataFilter, enableActionBlock } = this.state;

    return (
      <Pagination type={type} config={config} data={dataFilter} onAction={this._action} index={index} enableActionBlock={enableActionBlock} >
        {this.props.children}
      </Pagination>
    )
  }

  render() {
    return (
      <div className={_styles.data_list_wrapper}>
        {this._renderFilter()}
        {this._renderViewType()}
      </div>
    );
  }
}

DataList.propTypes = {
  type: PropTypes.oneOf(["table", "grid"]),
  config: PropTypes.array,
  data: PropTypes.array,
  action: PropTypes.func
};

DataList.defaultProps = {
  enableActionBlock: true
};
