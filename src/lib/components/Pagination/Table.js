import React, { Component } from "react";
import PropTypes from "prop-types";

const _styles = require("./styles.scss");

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      data: props.data,
      indexPath: props.index,
      enableActionBlock: props.enableActionBlock
    };
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
    let { config, enableActionBlock } = this.state;
    let listTableHeadRow = config.map((item, i) => {
      if (item.text === "Action") {
        if (enableActionBlock) {
          return <div key={i}>{item.text}</div>;
        }
      } else {
        return <div key={i}>{item.text}</div>;
      }

    });

    return <div className="head-wrapper">{listTableHeadRow}</div>;
  }

  _onAction = val => {
    return event => {
      this.props.action('view', val);
    };
  };

  _renderRowBody() {
    let { data, enableActionBlock } = this.state;

    //region Render Row and Column
    let rows = data.map((itemRow, indexRow) => {
      let columns = itemRow.map((itemColumn, indexColumn) => {
        let value =
          itemColumn.type === "Action" ? (<div className="action-wrapper">{itemColumn.value.value}</div>) : itemColumn.value.text;
        let imageVal =
          itemColumn.value.value === null || itemColumn.value.value === undefined
            ? ''
            : itemColumn.value.value;

        let actionView = itemColumn.type === "Action" ? null : this._onAction(itemRow[0].value.index);

        if (itemColumn.type === "Action") {
          if (enableActionBlock) {
            return <div onClick={actionView} key={indexColumn} className="column-wrapper">{value}</div>;
          }
        } else {
          return (
            <div onClick={actionView} key={indexColumn} className="column-wrapper">
              {itemColumn.type !== "image" ? value : <div className="image" style={{ background: `url(${imageVal})` }} />}
            </div>
          );
        }
      });
      let percColumn = 100 / (enableActionBlock ? columns.length : columns.length - 1);
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
