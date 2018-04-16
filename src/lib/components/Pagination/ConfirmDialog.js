import React, { Component } from "react";

import styles from './styles.scss';

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      actionName: props.actionName,
      dialog: props.dialog
    }
  }

  action = (val) => {
    return event => {
      let { index, actionName } = this.state;
      if (val) {
        this.props.action(true, actionName, index);
      } else {
        this.props.action(false);
      }
    }
  }

  render() {
    let { dialog } = this.state;
    return (
      <div className={styles.confirm_dialog}>
        <div className="dialog-wrapper ">
          <div className="content-wrapper">
            <div className="title">{dialog.confirmTitle}</div>
            <div className="text">{dialog.confirmText}</div>
            <div className="button-wrapper">
              <button className="yes" onClick={this.action(true)}> {dialog.confirmButton}</button>
              <button className="no" onClick={this.action(false)}> No, cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}