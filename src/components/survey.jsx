import React, { Component } from "react";
import surveyDataService from "../services/fakeDataService";
import SurveyTable from "./surveyTable";
import BarChart from "./common/barChart";
import utils from "../utils/utils";
import _ from "lodash";

class Survey extends Component {
  state = {
    data: [],
    filterOptions: {},
    currentPage: 1,
    pageSize: 20,
    filters: { gender: [], favoriteFruit: [], favoriteColor: [] },
    sortColumn: { path: "name", order: "asc" }
  };

  componentDidMount() {
    const data = surveyDataService.getSurveyData();

    this.setState({ data }, () => {
      let filterOptions = this.getFilterAttributes(
        Object.keys(this.state.filters)
      );
      this.setState({ filterOptions });
    });
  }

  /*    Handle states    */
  handleFilters = filters => {
    this.setState({
      filters,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  handlePageChange = (page, pageSize) => {
    this.setState({ currentPage: page });
  };

  /*    Get filterOptions    */
  orderFilterAttrsByAsc = array => {
    return _.orderBy(array);
  };

  getFilterAttributes(properties) {
    const { data } = this.state;
    let results = {};

    for (let property of properties) {
      let attrs = data.map(item => _.get(item, property));
      attrs = utils.removeDuplicate(attrs);
      const result = this.orderFilterAttrsByAsc(attrs);
      results[property] = result;
    }

    return results;
  }

  /*    Get selected data from the filters chosen    */
  selectDataByFilter = (data, filters) => {
    let selectedRecords = data;

    let hasFilter = false;
    for (let key in filters) {
      let attrs = filters[key];
      if (attrs.length !== 0) {
        hasFilter = true;
        let isInitial = true;
        let lastResult = selectedRecords;
        for (let value of attrs) {
          if (isInitial) {
            selectedRecords = selectedRecords.filter(
              record => _.get(record, key) === value
            );
            isInitial = false;
          } else
            selectedRecords = selectedRecords.concat(
              lastResult.filter(record => _.get(record, key) === value)
            );
        }
      }
    }

    if (!hasFilter) selectedRecords = data;

    return selectedRecords;
  };

  /*    Render Page Data    */
  getPageData = (selectedRecords, sortColumn, pageSize, currentPage) => {
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

  getAttrCnt(arr) {
    return arr.reduce(function(prev, next) {
      prev[next] = prev[next] + 1 || 1;
      return prev;
    }, {});
  }

  getGenderCorrelationData(selectedData, genders, relatedPath, relatedAttrs) {
    let results = [];

    for (let gender of genders) {
      const data = selectedData.filter(item => item.gender === gender);
      let attrs = data.map(item => _.get(item, relatedPath));
      let attrCnt = this.getAttrCnt(attrs);
      let result = {};
      for (let value of relatedAttrs) {
        result[value] = attrCnt[value];
      }
      result["name"] = gender;
      results.push(result);
    }

    return results;
  }

  getFilterForGraph(path) {
    const { filters, filterOptions } = this.state;
    const chosenOptions = _.get(filters, path);
    const allOptions = _.get(filterOptions, path);
    return chosenOptions.length === 0 ? allOptions : chosenOptions;
  }

  render() {
    const {
      data,
      filters,
      sortColumn,
      pageSize,
      currentPage,
      filterOptions
    } = this.state;

    let selectedRecords = this.selectDataByFilter(data, filters);

    let genderFilter = this.getFilterForGraph("gender") || [];
    let favoriteColorFilter = this.getFilterForGraph("favoriteColor") || [];
    let favoriteFruitFilter = this.getFilterForGraph("favoriteFruit") || [];

    const sourceData = this.getGenderCorrelationData(
      selectedRecords,
      genderFilter,
      "favoriteColor",
      favoriteColorFilter
    );

    const { paginatedRecords, count } = this.getPageData(
      selectedRecords,
      sortColumn,
      pageSize,
      currentPage
    );

    return (
      <div>
        <SurveyTable
          data={paginatedRecords}
          onSort={this.handleSort}
          currentPage={currentPage}
          filters={filters}
          pageSize={pageSize}
          sortColumn={sortColumn}
          filterOptions={filterOptions}
          onFilterChange={this.handleFilters}
          count={count}
          onPageChange={this.handlePageChange}
        />
        <BarChart sourceData={sourceData} fields={favoriteColorFilter} />
      </div>
    );
  }
}

export default Survey;
