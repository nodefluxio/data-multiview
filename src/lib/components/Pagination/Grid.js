import React, { Component } from "react";
import PropTypes from "prop-types";
import noImage from '../../assets/images/no-image.png';
import { getTextWidth } from '../../utils';

import styles from "./styles.scss";


export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      data: props.data,
      indexPath: props.index,
      rebuildTooltip: props.rebuildTooltip
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
  }

  componentDidMount() {
    this.state.rebuildTooltip();
  }

  action = val => {
    return event => {
      this.props.action('view', val);
    };
  };

  renderRowBody() {
    let { data } = this.state;
    return data.map((itemRow, indexRow) => {
      let imageVar = itemRow.find(x => x.type === "image");
      let imageVal =
        imageVar === null || imageVar === undefined
          ? noImage
          : imageVar.value.value;

      let listField = itemRow.filter(item => {
        return item.type !== "Action" && item.type !== "image"
      })

      let listFieldHtml = listField.map((item, index) => {
        let customStyle = {};
        if (item.textColor !== undefined && item.textColor !== null) {
          customStyle.color = item.textColor;
        }

        let length = getTextWidth(item.value.text, 13);
        let dataTip = length > 150 ? item.value.text.toString() : '';
        return (
          <div key={index} className="desc" style={customStyle} data-tip={dataTip}>
            {item.value.text}
          </div>
        )
      })
      let actionTemp = itemRow.find(x => x.type === "Action");
      actionTemp = actionTemp === undefined ? null : actionTemp.value.value
      return (
        <div
          key={indexRow}
          className="box-wrapper"
        >
          <div onClick={this.action(itemRow[0].value.index)} className="image-wrapper" style={{ background: `url(${imageVal})` }} />
          <div className="block" ><div className="action-wrapper">{actionTemp}</div></div>
          {listFieldHtml}
        </div>
      );
    });
  }

  render() {
    return (
      <div className={styles.grid_wrapper}>
        {this.renderRowBody()}
      </div>
    )
  }
}

Grid.propTypes = {
  config: PropTypes.array,
  data: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  filter: PropTypes.object,
  action: PropTypes.func
};