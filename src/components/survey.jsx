import React, { Component } from "react";
import surveyDataService from "../services/fakeDataService";
import SurveyTable from "./surveyTable";
import BarChart from "./common/barChart";
import _ from "lodash";
import utils from "../utils/utils";

class Survey extends Component {
  state = {
    data: [],
    filters: {},
    selectedData: []
  };

  componentDidMount() {
    const data = surveyDataService.getSurveyData();
    this.setState({ data });
  }

  handleFilters = filters => {
    // console.log("filters", filters);
    this.setState({ filters });
  };

  handleSelectedData = selectedData => {
    console.log("selectedData", selectedData);
    this.setState({ selectedData });
  };

  getAttrCnt(arr) {
    return arr.reduce(function(prev, next) {
      prev[next] = prev[next] + 1 || 1;
      return prev;
    }, {});
  }

  getGenderCorrelationData(selectedData, genders, relatedAttrs) {
    let results = {};

    for (let gender of genders) {
      const data = selectedData.filter(item => item.gender === gender);
      for (let relatedAttr of relatedAttrs) {
        let attrs = data.map(item => _.get(item, relatedAttr));
        results[gender] = this.getAttrCnt(attrs);
      }
    }
    return results;
  }

  render() {
    const { data, filters } = this.state;

    // const result = this.getGenderCorrelationData(
    //   utils.selectDataByFilter(data, filters),
    //   filters.gender,
    //   filters.favoriteColor
    // );
    console.log(filters);

    return (
      <div>
        <BarChart />
        <SurveyTable
          data={data}
          onChange={this.handleFilters}
          onSelectedData={this.handleSelectedData}
        />
      </div>
    );
  }
}

export default Survey;
