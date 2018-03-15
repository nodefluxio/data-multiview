# ActionBlock

Component for make Action view with action.

## Usage

#### JS:
```js
import  React  from  'react';
import  DataList, { Filter, Pagination, ActionBlock } from  '@billysutomo/data-list';

export  default class  App  extends  React.Component {

  action  = (actionName, indexData) => {
    console.log('action', actionName, indexData);
    /* start filter output example
    actionName: 'edit' or 'delete'
    indexData: this value is from ActionBLock 'index' props
    end */ 
  }
  
  render() { 
    <ActionBlock key="1" actionName="edit" onAction={this._action} index="value">
        /* your own icon here */
    </ActionBlock>
  }    
}

```