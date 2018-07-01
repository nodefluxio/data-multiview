import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from './Row';

import styles from "./styles.scss";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      data: props.data,
      indexPath: props.index,
      enableActionBlock: props.enableActionBlock,
      width: props.width,
      autoAjaxRow: props.autoAjaxRow,
      paramParsingData: props.paramParsingData
    };
  }

  componentWillReceiveProps(nextProps) {
    let { config, data, indexPath, autoAjaxRow, paramParsingData } = this.state;
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
    if (nextProps.autoAjaxRow !== autoAjaxRow) {
      this.setState({ autoAjaxRow: nextProps.autoAjaxRow })
    }
    if (nextProps.paramParsingData !== paramParsingData) {
      this.setState({ paramParsingData: nextProps.paramParsingData })
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

  action = (actionName, indexData) => {
    return () => {
      this.props.action(actionName, indexData);
    }
  };

  _renderRowBody() {
    let { data, enableActionBlock, width, autoAjaxRow, paramParsingData } = this.state;
    if (data.length === 0) {
      return null;
    }

    let rows = data.map((itemRow, indexRow) => {
      return <Row key={indexRow} index={indexRow} item={itemRow} width={width} enableActionBlock={enableActionBlock} action={this.action} autoAjaxRow={autoAjaxRow} paramParsingData={paramParsingData} />
    });
    return <div className="body-wrapper">{rows}</div>;
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
