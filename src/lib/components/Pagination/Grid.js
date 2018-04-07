import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const _styles = require("./styles.scss");
const image =
  "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg";

export default class Grid extends Component {
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

  _handleAction = val => {
    return event => {
      this.props.action(val);
    };
  };

  _renderRowBody() {
    let { data, config, indexPath } = this.state;
    let { children } = this.props;

    // let tempData = [];
    // data.map((itemData, index) => {
    //   for (let i = hideIndex[0]; i < hideIndex[1]; i++) {
    //     if (i === index) {
    //       tempData[index] = itemData;
    //     }
    //   }
    //   return null;
    // })

    //region Parsing data for filter and search
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
            columnText = null;
            columnValue = null;
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
    //endregion

    //region parsing data with type for checking type
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
    //endregion

    //region Grid
    return listRowParsing.map((itemRow, indexRow) => {
      let imageVar = itemRow.find(item => {
        if (item.type === "image") {
          return item;
        }
        return null;
      });
      let imageVal =
        imageVar.value.value === null || imageVar.value.value === undefined
          ? image
          : imageVar.value.value;

      let field1 =
        itemRow[1] !== undefined ? (
          <div className="title margin">{itemRow[1].value.text}</div>
        ) : (
            ""
          );
      let field2 =
        itemRow[2] !== undefined ? (
          <div className="desc margin">{itemRow[2].value.text}</div>
        ) : (
            ""
          );
      let field3 =
        itemRow[3] !== undefined ? (
          <div className="sub-desc margin">{itemRow[3].value.text}</div>
        ) : (
            ""
          );
      let actionTemp = itemRow.find(item => {
        return item.type === 'Action';
      })
      actionTemp = actionTemp === undefined ? null : actionTemp.value.value
      return (
        <div
          key={indexRow}
          className="box-wrapper"
          onClick={this._handleAction(itemRow[0].value.index)}
        >
          <div className="image-wrapper" style={{ background: `url(${imageVal})`, backgroundSize: '200px 150px' }} />
          <div className="block" ><div className="action-wrapper">{actionTemp}</div></div>
          {field1}
          {field2}
          {field3}
        </div>
      );
    });
    //endregion
  }

  render() {
    return <div className={_styles.grid_wrapper}>{this._renderRowBody()}</div>;
  }
}

Grid.propTypes = {
  config: PropTypes.array,
  data: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  filter: PropTypes.object,
  action: PropTypes.func
};