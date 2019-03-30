import React, { Component } from "react";
import { Card, Button, Input } from "antd";
import { SurveyDiv, ControlDiv } from "./css/surveyStyle";
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
    pageSize: 10,
    pageSizeInput: "",
    filters: { gender: [], favoriteFruit: [], favoriteColor: [] },
    sortColumn: { path: "name", order: "asc" },
    order: ["table", "graph1", "graph2"]
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

  handleOrder = item => {
    const { order } = this.state;
    let tmpOrder = [...order];
    tmpOrder.splice(tmpOrder.indexOf(item), 1);
    tmpOrder = [item, ...tmpOrder];
    this.setState({ order: tmpOrder });
  };

  handlePageSize = pageSizeInput => {
    let pageSize = Number(pageSizeInput);
    if (pageSize) this.setState({ pageSize });
    this.setState({ pageSizeInput });
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

  /*    Get page data fot the following rendering   */
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

  renderPageSizeInput = () => {
    const { pageSizeInput } = this.state;
    return (
      <div className="pageSizeInput">
        <span>Records per page:</span>
        <Input
          type="text"
          value={pageSizeInput}
          onChange={e => this.handlePageSize(e.currentTarget.value)}
        />
      </div>
    );
  };

  render() {
    const {
      data,
      filters,
      sortColumn,
      pageSize,
      currentPage,
      filterOptions,
      order
    } = this.state;

    let selectedRecords = this.selectDataByFilter(data, filters);

    const { paginatedRecords, count } = this.getPageData(
      selectedRecords,
      sortColumn,
      pageSize,
      currentPage
    );

    return (
      <React.Fragment>
        <ControlDiv>
          <Button onClick={() => this.handleOrder("table")}>
            Survey Table
          </Button>
          <Button onClick={() => this.handleOrder("graph1")}>
            Correlation: Gender & Fruit
          </Button>
          <Button onClick={() => this.handleOrder("graph2")}>
            Correlation: Gender & Color
          </Button>
        </ControlDiv>
        <SurveyDiv order={order}>
          <Card
            id="surveyTable"
            className="card cardForTable"
            title="Table"
            extra={this.renderPageSizeInput()}
          >
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
          </Card>
          <Card
            id="surveyGraph1"
            className="card cardForChart"
            title="Correlation between gender and fruit"
          >
            <div className="horizontalGraph">
              <BarChart
                data={selectedRecords}
                relatedPath="favoriteFruit"
                filters={filters}
                filterOptions={filterOptions}
                position="horizontal"
              />
            </div>
            <div className="verticalGraph">
              <BarChart
                data={selectedRecords}
                relatedPath="favoriteFruit"
                filters={filters}
                filterOptions={filterOptions}
                position="vertical"
              />
            </div>
          </Card>
          <Card
            id="surveyGraph2"
            className="card cardForChart"
            title="Correlation between gender and color"
          >
            <div className="horizontalGraph">
              <BarChart
                data={selectedRecords}
                relatedPath="favoriteColor"
                filters={filters}
                filterOptions={filterOptions}
                position="horizontal"
              />
            </div>
            <div className="verticalGraph">
              <BarChart
                data={selectedRecords}
                relatedPath="favoriteColor"
                filters={filters}
                filterOptions={filterOptions}
                position="vertical"
              />
            </div>
          </Card>
        </SurveyDiv>
      </React.Fragment>
    );
  }
}

export default Survey;
