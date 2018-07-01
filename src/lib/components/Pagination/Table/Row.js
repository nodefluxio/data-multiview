import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from './Column';
import { parsingData } from '../../../utils';

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      item: props.item,
      rowWidth: props.width,
      enableActionBlock: props.enableActionBlock,
      action: props.action,
      autoAjaxRow: props.autoAjaxRow,
      autoActionInterval: null,
      paramParsingData: props.paramParsingData
    }
  }

  componentWillReceiveProps(nextProps) {
    let $$ = this;
    let { autoAjaxRow, item } = this.state;
    this.setState({
      index: nextProps.index,
      item: nextProps.item,
      rowWidth: nextProps.rowWidth,
      enableActionBlock: nextProps.enableActionBlock,
      action: nextProps.action,
      autoAjaxRow: nextProps.autoAjaxRow,
      paramParsingData: nextProps.paramParsingData
    })

    if (nextProps.item !== item && nextProps.autoAjaxRow !== autoAjaxRow) {
      this.clearAutoAjaxRow(() => {
        $$.setState({ item: nextProps.item }, () => {
          $$.setAutoAjaxRow(nextProps.autoAjaxRow);
        })
      });

    } else if (nextProps.item !== item && nextProps.autoAjaxRow === autoAjaxRow) {
      this.clearAutoAjaxRow(() => {
        $$.setAutoAjaxRow(autoAjaxRow);
      });
    }
  }

  componentWillMount() {
    let { autoAjaxRow } = this.state;
    this.setAutoAjaxRow(autoAjaxRow);
  }

  componentWillUnmount() {
    this.clearAutoAjaxRow();
  }

  clearAutoAjaxRow = (callback) => {
    let { autoActionInterval } = this.state;
    clearInterval(autoActionInterval);
    this.setState({ autoActionInterval: null }, () => {
      callback();
    });
  }

  setAutoAjaxRow = (autoAjaxRow) => {
    if (autoAjaxRow == null)
      return;

    let $$ = this;
    let { autoActionInterval, paramParsingData, item } = this.state;
    let { timer, data } = autoAjaxRow;
    let { config, actionBlock, action, enableActionBlock } = paramParsingData;

    if (timer !== 0) {
      clearInterval(autoActionInterval);
      autoActionInterval = setInterval(() => {
        data(item[0].data.index).then(response => {
          let data = [response]
          let newFormatData = parsingData(data, config, paramParsingData.index, actionBlock, action, enableActionBlock);
          if (autoActionInterval !== null) {
            $$.setState({ item: newFormatData[0] });
          }
        }).catch(err => {
        })
      }, timer);
      this.setState({ autoActionInterval: autoActionInterval });
    }
  }

  render() {
    let { index, item, rowWidth, enableActionBlock, action } = this.state;
    let widthColumn = 0;
    let columnLength = enableActionBlock ? item.length : item.length - 1;

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

    let columns = item.map((itemColumn, indexColumn) => {
      return <Column
        key={indexColumn}
        index={indexColumn}
        item={itemColumn}
        rowWidth={rowWidth}
        enableActionBlock={enableActionBlock}
        columnLength={columnLength}
        widthColumn={widthColumn}
        action={action} />
    });

    return (
      <div key={index} className="row-wrapper" style={{ gridTemplateColumns: customCls }}>
        {columns}
      </div>
    );
  }
}

Row.propTypes = {
  index: PropTypes.number,
  item: PropTypes.array,
  rowWidth: PropTypes.number,
  enableActionBlock: PropTypes.bool,
  action: PropTypes.func,
  autoAjaxRow: PropTypes.object,
  paramParsingData: PropTypes.object
};