import React, { Component } from "react";
import { Pagination } from "antd";
import Table from "./common/table";
import _ from "lodash";

class SurveyTable extends Component {
  state = {
    columns: [
      { path: "name", label: "Name" },
      { path: "age", label: "Age" },
      { path: "gender", label: "Gender" },
      { path: "favoriteFruit", label: "Favorite Fruit" },
      { path: "favoriteColor", label: "Favorite Color" }
    ]
  };

  render() {
    const {
      data,
      onSort,
      currentPage,
      filters,
      pageSize,
      sortColumn,
      filterOptions,
      onFilterChange,
      count,
      onPageChange
    } = this.props;
    const { columns } = this.state;

    return (
      <React.Fragment>
        <Table
          data={data}
          onSort={onSort}
          filters={filters}
          sortColumn={sortColumn}
          filterOptions={filterOptions}
          onChange={onFilterChange}
          columns={columns}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={count}
          onChange={onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default SurveyTable;
