import React from 'react';
import moment from "moment";

export function getTextWidth(text, font) {
  let element = document.getElementById("count");
  if (element) {
    element.style.fontSize = font;
    element.innerHTML = text;
    let width = element.clientWidth;
    element.innerHTML = '';
    return width;
  } else {
    return 0;
  }
}

export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export function parsingData(data, config, indexPath, children, action, enableActionBlock) {
  let listRow = [];
  data.map((itemData, indexRow) => {
    let listColumn = [];
    config.map((itemConfig, indexColumn) => {
      let columnText;
      let columnValue;
      let indexValue;
      if (itemConfig.text === "Action" && typeof children) {
        if (enableActionBlock) {
          columnText = "Action";
          columnValue = [];
          //////////////////////////////
          let tempItemRow = itemData;
          let indexPathValue = indexPath.split("/");
          for (const x in indexPathValue) {
            if (tempItemRow[indexPathValue[x]] !== null &&
              tempItemRow[indexPathValue[x]] !== undefined) {
              let temp_data = tempItemRow[indexPathValue[x]];
              indexValue = temp_data;
            }
          }
          //////////////////////////////
          let tempActions = [];
          if (children.length > 0) {
            children.map((item, itemChildren) => {
              item = React.cloneElement(item, {
                index: indexValue,
                key: itemChildren,
                onAction: action
              });
              tempActions.push(item);
              return null;
            });
          }
          else {
            tempActions = React.cloneElement(children, {
              index: indexValue,
              onAction: action
            });
          }
          columnValue = tempActions;
        }
      }
      else {
        //region Get column Text
        let tempItemRow = itemData;
        let textPath = itemConfig.textPath.split("/");
        for (const x in textPath) {
          if (tempItemRow[textPath[x]] !== null &&
            tempItemRow[textPath[x]] !== undefined) {
            let temp_data = tempItemRow[textPath[x]];
            tempItemRow = temp_data;
            columnText = temp_data;
          }
        }
        //endregion
        //region Get column Value
        tempItemRow = itemData;
        let valuePath = itemConfig.valuePath.split("/");
        for (const x in valuePath) {
          if (tempItemRow[valuePath[x]] !== null &&
            tempItemRow[valuePath[x]] !== undefined) {
            let temp_data = tempItemRow[valuePath[x]];
            tempItemRow = temp_data;
            columnValue = temp_data;
          }
        }
        //endregion
        tempItemRow = itemData;
        let indexPathValue = indexPath.split("/");
        for (const x in indexPathValue) {
          if (tempItemRow[indexPathValue[x]] !== null &&
            tempItemRow[indexPathValue[x]] !== undefined) {
            let temp_data = tempItemRow[indexPathValue[x]];
            indexValue = temp_data;
          }
        }
        if (typeof columnText === 'object' || typeof columnValue === 'object') {
          columnText = '';
          columnValue = '';
        }
        if (itemConfig.type === "date") {
          columnText = moment(columnText).format("DD MMM YYYY");
          columnValue = moment(columnValue).format("DD MMM YYYY");
        }
        else if (itemConfig.type === "json") {
          columnText = JSON.stringify(columnText);
          if (columnText === columnValue) {
            columnValue = JSON.stringify(columnValue);
          }
        }
        else if (itemConfig.type === "datetime") {
          columnText = moment(columnText).format("DD MMM YYYY, HH:mm");
          columnValue = moment(columnValue).format("DD MMM YYYY, HH:mm");
        }
      }
      listColumn.push({ text: columnText, data: columnValue, index: indexValue });
      return null;
    });
    listRow.push(listColumn);
    return null;
  });
  let listRowParsing = [];
  listRow.map((itemRow, indexRow) => {
    let row = [];
    itemRow.map((data, indexData) => {
      let temp = {};
      config.map((itemConfig, indexConfig) => {
        if (indexConfig === indexData) {
          if (itemConfig.text === 'Action') {
            temp.type = 'Action';
            temp.data = data;
          }
          else {
            temp.type = itemConfig.type;
            temp.textColor = itemConfig.textColor;
            temp.data = data;
          }
        }
        return null;
      });
      row.push(temp);
      return null;
    });
    listRowParsing.push(row);
    return null;
  });
  return listRowParsing;
}

//pagination algorithm https://gist.github.com/kottenator/9d936eb3e4e3c3e02598 
//danilopolani
export function pagination(currentPage, pageCount) {
  let delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    result = [];

  result = Array.from({ length: pageCount }, (v, k) => k + 1)
    .filter(i => i && i >= left && i < right);

  if (result.length > 1) {
    // Add first page and dots
    if (result[0] > 1) {
      if (result[0] > 2) {
        result.unshift('...')
      }
      result.unshift(1)
    }

    // Add dots and last page
    if (result[result.length - 1] < pageCount) {
      if (result[result.length - 1] !== pageCount - 1) {
        result.push('...')
      }
      result.push(pageCount)
    }
  }
  return result;
}