import React, { Component } from "react";
import PropTypes from "prop-types";

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

  _onAction = val => {
    return event => {
      this.props.action('view', val);
    };
  };

  _renderRowBody() {
    let { data } = this.state;

    //region Grid
    return data.map((itemRow, indexRow) => {
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

      let listField = itemRow.filter(item => {
        return item.type !== "Action" && item.type !== "image"
      })

      let listFieldHtml = listField.map((item, index) => {
        return <div key={index} className="desc margin">{item.value.text}</div>
      })
      let actionTemp = itemRow.find(item => {
        return item.type === 'Action';
      })
      actionTemp = actionTemp === undefined ? null : actionTemp.value.value
      return (
        <div
          key={indexRow}
          className="box-wrapper"
        >
          <div onClick={this._onAction(itemRow[0].value.index)} className="image-wrapper" style={{ background: `url(${imageVal})` }} />
          <div className="block" ><div className="action-wrapper">{actionTemp}</div></div>
          {listFieldHtml}
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