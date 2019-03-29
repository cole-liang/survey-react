import React, { Component } from "react";
import { Pagination } from "antd";
import Table from "./common/table";
import utils from "../utils/utils";
import _ from "lodash";

class SurveyTable extends Component {
  state = {
    columns: [
      { path: "name", label: "Name" },
      { path: "age", label: "Age" },
      { path: "gender", label: "Gender" },
      { path: "favoriteFruit", label: "Favorite Fruit" },
      { path: "favoriteColor", label: "Favorite Color" }
    ],
    filterOptions: {},
    currentPage: 1,
    pageSize: 20,
    filters: { gender: [], favoriteFruit: [], favoriteColor: [] },
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    let filterOptions = {};
    await new Promise(resolve => {
      setTimeout(() => {
        filterOptions = this.getFilterAttributes([
          "gender",
          "favoriteFruit",
          "favoriteColor"
        ]);
        resolve();
      }, 0);
    });
    this.setState({ filterOptions });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  handleFilters = filters => {
    this.props.onChange(filters);
    this.setState({
      filters,
      currentPage: 1
    });
  };

  handlePageChange = (page, pageSize) => {
    this.setState({ currentPage: page });
  };

  orderFilterAttrsByAsc = array => {
    return _.orderBy(array);
  };

  getFilterAttributes(properties) {
    const { data } = this.props;
    let results = {};

    for (let property of properties) {
      let attrs = data.map(item => _.get(item, property));
      attrs = utils.removeDuplicate(attrs);
      const result = this.orderFilterAttrsByAsc(attrs);
      results[property] = result;
    }

    return results;
  }

  // selectDataByFilter = (data, filters) => {
  //   let selectedRecords = data;
  //   // console.log(filters);

  //   let hasFilter = false;
  //   for (let key in filters) {
  //     let attrs = filters[key];
  //     if (attrs.length !== 0) {
  //       hasFilter = true;
  //       let isInitial = true;
  //       let lastResult = selectedRecords;
  //       for (let value of attrs) {
  //         if (isInitial) {
  //           selectedRecords = selectedRecords.filter(
  //             record => _.get(record, key) === value
  //           );
  //           isInitial = false;
  //         } else
  //           selectedRecords = selectedRecords.concat(
  //             lastResult.filter(record => _.get(record, key) === value)
  //           );
  //       }
  //     }
  //   }

  //   if (!hasFilter) selectedRecords = data;

  //   // this.props.onSelectedData(selectedRecords);
  //   return selectedRecords;
  // };

  getPageData = (data, filters, sortColumn, pageSize, currentPage) => {
    let selectedRecords = utils.selectDataByFilter(data, filters);

    const sortedRecords = _.orderBy(
      selectedRecords,
      sortColumn.path,
      sortColumn.order
    );

    const paginatedRecords = utils.paginate(
      sortedRecords,
      pageSize,
      currentPage
    );

    const count = selectedRecords.length;

    return { paginatedRecords, count };
  };

  render() {
    const { data } = this.props;
    const {
      currentPage,
      filters,
      pageSize,
      sortColumn,
      filterOptions,
      columns
    } = this.state;

    const { paginatedRecords, count } = this.getPageData(
      data,
      filters,
      sortColumn,
      pageSize,
      currentPage
    );

    return (
      <React.Fragment>
        <Table
          data={paginatedRecords}
          columns={columns}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          filters={filters}
          onChange={this.handleFilters}
          filterOptions={filterOptions}
        />
        <Pagination
          onChange={this.handlePageChange}
          pageSize={pageSize}
          current={currentPage}
          total={count}
        />
      </React.Fragment>
    );
  }
}

export default SurveyTable;
