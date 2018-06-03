import React from 'react'
import { shallow, mount, render } from 'enzyme';
import DataList from '../index';
let img = 'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg';
let imageStream = 'http://192.168.100.125:8080/';
let imgQuoteError = `http://192.168.100.71/target-data/fr/target-person-images/1111112222233333@Rizkifika-Asanuli'nam/qTD8vYa.jpeg`;

describe('Testing DataList', () => {

  let action = (actionName, indexData) => {
    console.log('action APP', actionName, indexData);
  }

  let dataListProps = {
    index: 'id',
    type: 'grid',
    config: [
      { text: 'Image', type: 'image', textPath: 'image', textColor: 'red', valuePath: 'image' },
      { text: 'Fullname', type: 'string', textPath: 'fullname', valuePath: 'fullname' },
      { text: 'Role', type: 'string', textPath: 'role', valuePath: 'role' },
      { text: 'Datetime', type: 'date', textPath: 'datetime', valuePath: 'datetime' },
      { text: 'Json', type: 'json', textPath: 'json', valuePath: 'json' },
    ],
    data: [
      { id: 305, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 1 }, cam_detail: { id: 2, name: 'kamera huawei' }, vas_detail: { id: 3, name: 'VAS 3' }, image: img },
      { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: '' }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imageStream },
      { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: null }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imgQuoteError },
      { id: 306, created_at: '2018-02-23T09:43:08.928Z', rule_detail: { id: 2, name: 'Crowd Behaviour' }, cam_detail: { id: 3, name: 'kamera avigilon' }, vas_detail: { id: 4, name: 'VAS 4' }, image: imageStream },
    ],
    onAction: action,
    enableActionBlock: false
  }

  it('render component without problem', () => {
    const wrapper = shallow(<DataList {...dataListProps} />)
    expect(wrapper).toMatchSnapshot();
  })
  it('render Pagination without error', () => {
    expect(shallow(<DataList {...dataListProps}/>).find('Pagination').exists()).toBe(true)
  })
  it('render Filter without error', () => {
    expect(shallow(<DataList {...dataListProps}/>).find('Filter').exists()).toBe(true)
  })
})