import React, { Component } from "react";
import surveyDataService from "../services/fakeDataService";
import SurveyTable from "./surveyTable_dump";
import utils from "../utils/utils";
import _ from "lodash";

class Survey extends Component {
  state = {
    data: [],
    currentPage: 1,
    pageSize: 20,
    currentAttribute: null,
    sortColumn: { path: "name", order: "asc" }
  };

  componentDidMount() {
    const data = surveyDataService.getSurveyData();
    this.setState({ data });
  }

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn: sortColumn });
  };

  handleAttribute = attr => {
    this.setState({
      currentAttribute: attr,
      currentPage: 1
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getFilterAttributes(properties) {
    let results = {};

    for (let property of properties) {
      let attrs = utils.removeDuplicate(
        this.state.data.map(item => _.get(item, property))
      );
      let result = attrs.map(item => {
        return { text: item, value: item };
      });
      results[property] = result;
    }

    return results;
  }

  render() {
    const { data, currentPage, currentAttribute, pageSize } = this.state;

    return (
      <div>
        <SurveyTable data={data} />
      </div>
    );
  }
}

export default Survey;
