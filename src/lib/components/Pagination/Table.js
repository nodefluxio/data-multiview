import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const _styles = require("./styles.scss");

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      data: props.data,
      indexPath: props.index
    };
  }

  componentWillMount() {
    let { config } = this.state;
    let { children } = this.props;
    if (children) {
      config.push({
        text: "Action"
      });
    }
    this.setState({ config });
  }

  componentWillReceiveProps(nextProps) {
    let { config, data, indexPath } = this.state;
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data });
    }
    if (nextProps.index !== indexPath) {
      this.setState({ indexPath: nextProps.index });
    }
  }

  _renderRowTitle() {
    let { config } = this.state;
    let listTableHeadRow = config.map((item, i) => {
      if (item.type !== 'image') {
        return <div key={i}>{item.text}</div>;
      }
      return null;
    });

    return <div className="head-wrapper">{listTableHeadRow}</div>;
  }

  _renderRowBody() {
    let { data, config, indexPath } = this.state;
    let { children } = this.props;

    let listRow = [];
    data.map((itemData, indexRow) => {
      let listColumn = [];
      config.map((itemConfig, indexColumn) => {
        if (itemConfig.type !== 'image') {
          let columnText = null;
          let columnValue = null;

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
                  key: itemChildren
                });
                tempActions.push(item);
                return null;
              });

            } else {
              tempActions = React.cloneElement(children, {
                index: indexValue
              });
            }
            columnValue = <div className="action-wrapper">{tempActions}</div>;
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

            if (itemConfig.type === "date") {
              columnText = moment(columnText).format("DD MMM YYYY");
              columnValue = moment(columnValue).format("DD MMM YYYY");
            } else if (itemConfig.type === "json") {
              columnText = JSON.stringify(columnText);
              if (columnText === columnValue) {
                columnValue = JSON.stringify(columnValue);
              }
            }
          }

          listColumn.push({ text: columnText, value: columnValue });
          return null;
        }
        return null;
      });
      listRow.push(listColumn);
      return null;
    });
    //endregion

    //region Render Row and Column
    let rows = listRow.map((itemRow, indexRow) => {
      let columns = itemRow.map((itemColumn, indexColumn) => {
        let value =
          itemColumn.text === "Action" ? itemColumn.value : itemColumn.text;
        return (
          <div key={indexColumn} className="column-wrapper">
            {value}
          </div>
        );
      });
      let percColumn = 100 / columns.length;
      let customCls = '';
      for (let i = 0; i < columns.length; i++) {
        customCls += percColumn.toString() + '% ';
      }
      return (
        <div key={indexRow} className="row-wrapper" style={{ gridTemplateColumns: customCls }}>
          {columns}
        </div>
      );
    });
    return <div className="body-wrapper">{rows}</div>;
    //endregion
  }

  render() {
    return (
      <div className={_styles.table_wrapper}>
        {this._renderRowTitle()}
        {this._renderRowBody()}
      </div>
    );
  }
}

Table.propTypes = {
  config: PropTypes.array,
  data: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  filter: PropTypes.object
};
