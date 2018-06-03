import React from 'react'
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactTooltip from 'react-tooltip'
import { parsingData } from '../../../utils';
import Grid from '../Grid';
import ActionBlock from '../../ActionBlock';
let img = 'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg';
let imageStream = 'http://192.168.100.125:8080/';
let imgQuoteError = `http://192.168.100.71/target-data/fr/target-person-images/1111112222233333@Rizkifika-Asanuli'nam/qTD8vYa.jpeg`;

describe('Testing Grid', () => {

  let index = 'id';

  let data = [
    { id: 305, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 1 }, cam_detail: { id: 2, name: 'kamera huawei' }, vas_detail: { id: 3, name: 'VAS 3' }, image: img },
    { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: '' }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imageStream },
    { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: null }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imgQuoteError },
    { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: 'Crowd Behaviour' }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imageStream },
  ];

  let config = [
    { text: 'Image', type: 'image', textPath: 'image', textColor: 'red', valuePath: 'image' },
    { text: 'Fullname', type: 'string', textPath: 'fullname', valuePath: 'fullname' },
    { text: 'Role', type: 'string', textPath: 'role', valuePath: 'role' },
    { text: 'Datetime', type: 'date', textPath: 'datetime', valuePath: 'datetime' },
    { text: 'Json', type: 'json', textPath: 'json', valuePath: 'json' },
  ]

  let action = (actionName, indexData, confirmDialog, confirmDialogData) => {
    // console.log('action', actionName, indexData, confirmDialog, confirmDialogData);
    if (confirmDialog) {
      this.setState({ confirmDialogIndex: indexData, confirmDialogActionName: actionName, confirmDialogData });
    } else {
      this.props.onAction(actionName, indexData);
    }
  }

  let rebuildTooltip = () => {
    ReactTooltip.rebuild();
  }

  let actionBlock = [
    (<ActionBlock key="1" actionName="edit" onAction={action}>
      <i className="icon icon-pencil" />
    </ActionBlock>),
    (<ActionBlock key="2" actionName="delete" onAction={action} confirmDialog={true}>
      <i className="icon icon-delete" />
    </ActionBlock>)
  ]

  let dataListProps = {
    index: index,
    config: config,
    data: parsingData(data, config, index, actionBlock, action, true),
    rebuildTooltip: rebuildTooltip
  }

  it('render component without problem', () => {
    const wrapper = shallow(<Grid {...dataListProps} />)
    expect(wrapper).toMatchSnapshot();
  })
})