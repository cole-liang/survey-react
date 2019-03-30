import React, { Component } from "react";
import { Popover, Checkbox, Icon } from "antd";
import SearchBox from "./searchBox";

const CheckboxGroup = Checkbox.Group;

class TableHeader extends Component {
  state = {
    currentAttr: "",
    searchInput: ""
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
    this.setState({ currentAttr, searchInput: "" });
  };

  handleSearchChange = query => {
    this.setState({ searchInput: query });
  };

  renderSearchBox = () => {
    const { searchInput } = this.state;
    return <SearchBox value={searchInput} onChange={this.handleSearchChange} />;
  };

  renderCheckBox = filterOptions => {
    let result = {};
    for (let key in filterOptions) {
      result[key] = (
        <React.Fragment>
          <CheckboxGroup
            className="filterCheckBox"
            options={filterOptions[key]}
            onChange={e => this.onChange(e)}
          />
        </React.Fragment>
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
    const { currentAttr, searchInput } = this.state;

    let tmpFilterOptions = { ...filterOptions };

    tmpFilterOptions[currentAttr] = filterOptions[currentAttr]
      ? filterOptions[currentAttr].filter(item =>
          item.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      : [];

    const contents = this.renderCheckBox(tmpFilterOptions);
    const searchBox = this.renderSearchBox();

    return (
      <div className="tr">
        {columns.map(column => (
          <React.Fragment>
            <div className="th" key={column.path || column.key}>
              <div className="sort" onClick={() => this.raiseSort(column.path)}>
                {column.label}
                {this.renderSortIcon(column)}
              </div>

              {Object.keys(filterOptions).find(
                item => item === column.path
              ) && (
                <Popover
                  placement="bottom"
                  title={searchBox}
                  content={contents[column.path]}
                  trigger="click"
                >
                  <div
                    className="filter"
                    onClick={() => this.onClick(column.path)}
                  >
                    <Icon type="filter" />
                  </div>
                </Popover>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default TableHeader;
