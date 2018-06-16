import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTextWidth } from '../../utils';
import noImage from '../../assets/images/no-image.png';

import styles from "./styles.scss";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      data: props.data,
      indexPath: props.index,
      enableActionBlock: props.enableActionBlock,
      width: props.width
    };
  }

  componentWillReceiveProps(nextProps) {
    let { config, data, indexPath } = this.state;
    if (nextProps.config !== config) {
      this.setState({ config: nextProps.config });
    }
    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data }, () => {
        this.props.rebuildTooltip();
      });
    }
    if (nextProps.index !== indexPath) {
      this.setState({ indexPath: nextProps.index });
    }
    if (nextProps.width !== 0) {
      this.setState({ width: nextProps.width })
    }
  }

  componentDidMount() {
    this.props.rebuildTooltip();
  }

  _renderRowTitle() {
    let { config, enableActionBlock } = this.state;
    let listTableHeadRow = config.map((item, i) => {
      if (item.text === "Action") {
        if (enableActionBlock) {
          return <div key={i}>{item.text}</div>;
        }
      } else {
        return <div key={i}>{item.text}</div>;
      }
      return null;
    });
    return <div className="head-wrapper">{listTableHeadRow}</div>;
  }

  _onAction = val => {
    return event => {
      this.props.action('view', val);
    };
  };

  _renderRowBody() {
    let { data, enableActionBlock, width } = this.state;
    if (data.length === 0) {
      return null;
    }
    let widthColumn = 0;
    let columnLength = enableActionBlock ? data[0].length : data[0].length - 1;
    //region Render Row and Column
    let rows = data.map((itemRow, indexRow) => {
      let columns = itemRow.map((itemColumn, indexColumn) => {
        let value =
          itemColumn.type === "Action" ? (<div className="action-wrapper">{itemColumn.value.value}</div>) : itemColumn.value.text;
        let imageVal =
          itemColumn === null || itemColumn === undefined
            ? noImage
            : itemColumn.value.value;

        let actionView = itemColumn.type === "Action" ? null : this._onAction(itemRow[0].value.index);
        let customStyle = {};
        if (width !== 0) {
          widthColumn = width / columnLength;
        }
        // customStyle.width = widthColumn;
        if (itemColumn.type === "Action") {
          customStyle.alignContent = 'center';
          if (enableActionBlock) {
            return <div onClick={actionView} key={indexColumn} className="column-wrapper" style={customStyle}>{value}</div>;
          }
        } else {
          if (itemColumn.textColor !== undefined && itemColumn.textColor !== null) {
            customStyle.color = itemColumn.textColor;
          }

          let element;
          let dataTip = '';

          if (itemColumn.type !== "image") {
            element = value;
            if (width !== 0) {
              let length = getTextWidth(itemColumn.value.text, 13);
              dataTip = length > widthColumn ? itemColumn.value.text.toString() : '';
            }
          } else {
            element = <div className="image" style={{ background: `url(${imageVal})` }} />;
          }
          return (
            <div onClick={actionView} key={indexColumn} className="column-wrapper" style={customStyle} data-tip={dataTip}>
              {element}
            </div>
          );
        }
        return null;
      });

      let customCls = '';
      if (widthColumn !== 0) {
        for (let i = 0; i < columnLength; i++) {
          customCls += widthColumn.toString() + 'px ';
        }
      } else {
        for (let i = 0; i < columnLength; i++) {
          customCls += (100 / columnLength).toString() + '% ';
        }
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
      <div className={styles.table_wrapper}>
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
