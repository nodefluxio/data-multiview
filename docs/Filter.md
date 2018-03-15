# Filter

Component for make filter view.

## Usage

#### JS:
```js
import  React  from  'react';
import  DataList, { Filter, Pagination, ActionBlock } from  '@billysutomo/data-list';

export  default class  App  extends  React.Component {

  action  = (filter) => {
    console.log('filter', filter);
    /* start filter output example
    {
        filter: [
            0: 'value aa'
        ],
        search: 'custom search'
    }
    end */ 
  }
  
  render() {
    return <Filter config={config} data={data} action={this._action} />   
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
```