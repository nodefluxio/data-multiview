# Pagination

Component for make Pagination view.

## Usage

#### JS:
```js
import  React  from  'react';
import  DataList, { Filter, Pagination, ActionBlock } from  '@nodeflux/data-multiview';

export  default class  App  extends  React.Component {

  action  = (actionName, indexData) => {
    console.log('action', actionName, indexData);
    /* start filter output example
    actionName: 'edit' or 'delete'
    indexData: this value is from Pagination 'index' props
    end */ 
  }
  
  render() { 
    <Pagination type="table" config={config} data={data} onAction={this._action} index="fullname" />
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
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: img }
]
```