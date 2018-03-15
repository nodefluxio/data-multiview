import React from 'react';
import PropTypes from 'prop-types';

import _styles from './styles.scss';

class ActionBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      actionName: props.actionName
    };
  }

  _onAction = (val) => {
    return event => {
      let { index, actionName } = this.state;
      this.props.onAction(actionName, index);
    };
  }

  render() {
    let func = this._onAction(true);
    return (
      <div onClick={func} className={_styles.action_block_wrapper + ' action-block'}>
        {this.props.children}
      </div >
    );
  }
}

ActionBlock.propTypes = {
  onClick: PropTypes.func,
  objectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  confirmDialog: PropTypes.bool,
  confirmTitle: PropTypes.string,
  confirmText: PropTypes.string,
  confirmButton: PropTypes.string
};

ActionBlock.defaultProps = {
  confirmDialog: false,
  confirmTitle: 'Delete Data',
  confirmText: 'Are you sure to delete this data?',
  confirmButton: 'Yes'
};

export default ActionBlock;
