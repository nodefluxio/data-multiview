import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTextWidth } from '../../../utils';
import noImage from '../../../assets/images/no-image.png';

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      item: props.item,
      rowWidth: props.width,
      enableActionBlock: props.enableActionBlock,
      columnLength: props.columnLength,
      widthColumn: props.widthColumn,
      action: props.action
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      item: nextProps.item,
      rowWidth: nextProps.width,
      enableActionBlock: nextProps.enableActionBlock,
      columnLength: nextProps.columnLength,
      widthColumn: nextProps.widthColumn,
      action: nextProps.action
    })
  }

  render() {
    let { item, index, rowWidth, enableActionBlock, columnLength, widthColumn, action } = this.state;
    let value =
      item.type === "Action" ? (<div className="action-wrapper">{item.data.data}</div>) : item.data.text;

    let imageVal =
      item === null || item === undefined
        ? noImage
        : item.data.data;

    let actionView = item.type === "Action" ? null : action('view', item.data.index);
    let customStyle = {};
    if (rowWidth !== 0) {
      widthColumn = rowWidth / columnLength;
    }

    if (item.type === "Action") {
      customStyle.alignContent = 'center';

      if (enableActionBlock) {
        return <div onClick={actionView} key={index} className="column-wrapper" style={customStyle}>{value}</div>;
      } else {
        return null;
      }
    } else {
      if (item.textColor !== undefined && item.textColor !== null) {
        customStyle.color = item.textColor;
      }

      let element;
      let dataTip = '';

      if (item.type !== "image") {
        element = value;
        if (rowWidth !== 0) {
          let length = getTextWidth(item.data.text, 13);
          dataTip = length > widthColumn ? item.data.text.toString() : '';
        }
      } else {
        element = <div className="image" style={{ background: `url(${imageVal})` }} />;
      }
      return (
        <div onClick={actionView} key={index} className="column-wrapper" style={customStyle} data-tip={dataTip}>
          {element}
        </div>
      );
    }
  }
}

Column.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  rowWidth: PropTypes.number,
  enableActionBlock: PropTypes.bool,
  columnLength: PropTypes.number,
  widthColumn: PropTypes.number,
  action: PropTypes.func
};