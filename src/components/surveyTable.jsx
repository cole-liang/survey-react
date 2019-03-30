import React, { Component } from "react";
import { Pagination } from "antd";
import Table from "./common/table";

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
      <div>
        <Table
          className="surveyTable"
          data={data}
          onSort={onSort}
          filters={filters}
          sortColumn={sortColumn}
          filterOptions={filterOptions}
          onChange={onFilterChange}
          columns={columns}
        />
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={pageSize}
          total={count}
          onChange={onPageChange}
        />
      </div>
    );
  }
}

export default SurveyTable;
