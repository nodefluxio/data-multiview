import React from 'react';
import DataList, { Filter, Pagination, ActionBlock } from '../lib';

let img = 'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg';
export default class App extends React.Component {

  _action = (actionName, indexData) => {
    console.log('action APP', actionName, indexData);
  }

  render() {
    return (
      <div>
        <DataList type="table" config={config} data={data} onAction={this._action} index="fullname" />
        <Pagination type="table" config={config} data={data} onAction={this._action} index="fullname" />
        <Filter config={config} data={filterData} action={this._action} />
        <ActionBlock key="1" actionName="edit" onAction={this._action} index="value">
          <i className="icon icon-pencil" />
        </ActionBlock>
      </div>
    )
  }
}

var config = [
  { text: 'Image', type: 'image', textPath: 'image', valuePath: 'image' },
  { text: 'Fullname', type: 'string', textPath: 'fullname', valuePath: 'fullname' },
  { text: 'Role', type: 'string', textPath: 'role', valuePath: 'role' },
  { text: 'Datetime', type: 'date', textPath: 'datetime', valuePath: 'datetime' },
  { text: 'Json', type: 'json', textPath: 'json', valuePath: 'json' },
]

var data = [
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'oaoa', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role AA', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-05 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'oaoa', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role AA', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-05 14:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'oaoa', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role AA', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'oaoa', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role AA', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-06 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'oaoa', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role AA', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role BB', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role CC', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'nama saya', role: 'role DD', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
  { fullname: 'Komandan', role: 'Jenderal', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img },
]

var filterData = [
  {
    title: 'Title',
    listValue: [
      { text: 'Data one', value: 'one' },
      { text: 'Data two', value: 'two' },
      { text: 'Data three', value: 'three' },
      { text: 'Data four', value: 'four' },
      { text: 'Data five', value: 'five' }
    ]
  }
]