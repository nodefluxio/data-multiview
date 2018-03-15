# @nodeflux/data-list

React component made for showing list of data, for simplfy creating view. Equiped with standard action like edit and delete. But also can be customized with other action and icon. Currently only have two type of view which is Grid and Table


## Installation

```
npm install --save @billysutomo/data-list
```
or
```
yarn add @billysutomo/data-list
```

## Usage

#### CSS:
```css
require("@billysutomo/data-list/build/css/index.css");
```
#### JS:
```js
import  React  from  'react';
import  DataList, { Filter, Pagination, ActionBlock } from  '@billysutomo/data-list';

export  default class  App  extends  React.Component {

  action  = (actionName, indexData) => {
    console.log('action APP', actionName, indexData);
  }
  
  render() {
    return (	    
      <div>		    
        <DataList  
        type="table"  
        config={config}  
        data={data}  
        onAction={this._action}  
        index="fullname"  />		    
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
  { fullname: 'nama saya', role: 'role saya', json: { "name": "binchen" }, datetime: '2018-02-04 13:37:27.736024', image: imgPathHere },
]
```
### Other component usage
| Method                              | Description             |
| ----------------------------------- | ----------------------- |
| [`Filter`](docs/Filter.md) | Filter usage example. |
| [`Pagination`](docs/Pagination.md) | Pagination usage example. |
| [`ActionBlock`](docs/ActionBlock.md) | ActionBLock usage example. |