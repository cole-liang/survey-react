import React, { Component } from "react";
import { Popover, Button, Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

class TableHeader extends Component {
  state = {
    currentAttr: ""
  };

  raiseSort(path) {
    let column = { ...this.props.sortColumn };
    if (column.path === path)
      column.order = column.order === "asc" ? "desc" : "asc";
    else {
      column.path = path;
      column.order = "asc";
    }
    this.props.onSort(column);
  }

  onChange(checkedValues) {
    const { currentAttr } = this.state;
    const { filters } = this.props;
    const newFilters = { ...filters };
    newFilters[currentAttr] = checkedValues;
    this.props.onChange(newFilters);
  }

  onClick = currentAttr => {
    this.setState({ currentAttr });
  };

  renderCheckBox = filterOptions => {
    let result = {};
    for (let key in filterOptions) {
      result[key] = (
        <CheckboxGroup
          options={filterOptions[key]}
          onChange={e => this.onChange(e)}
        />
      );
    }
    return result;
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.path) return null;
    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };

  render() {
    const { columns, filterOptions } = this.props;
    const text = <span>Title</span>;
    const contents = this.renderCheckBox(filterOptions);

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <React.Fragment>
              <th
                className="clickable"
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
              {Object.keys(filterOptions).find(
                item => item === column.path
              ) && (
                <Popover
                  placement="bottom"
                  title={text}
                  content={contents[column.path]}
                  trigger="click"
                >
                  <Button onClick={() => this.onClick(column.path)}>
                    Bottom
                  </Button>
                </Popover>
              )}
            </React.Fragment>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
