import React, { Component } from "react";
import { Chart, Tooltip, Axis, Legend, Bar, Coord } from "viser-react";
import _ from "lodash";
const DataSet = require("@antv/data-set");

class BarChart extends Component {
  prepareData = () => {
    const { data, relatedPath, position } = this.props;

    let genderFilter = this.getFilterForGraph("gender") || [];

    let fields =
      relatedPath === "favoriteColor"
        ? this.getFilterForGraph("favoriteColor")
        : this.getFilterForGraph("favoriteFruit");

    const sourceData =
      position === "horizontal"
        ? this.getHorizontalCorrelationData(
            data,
            genderFilter,
            relatedPath,
            fields
          )
        : this.getVerticalCorrelationData(
            data,
            genderFilter,
            relatedPath,
            fields
          );

    return { genderFilter, fields, sourceData };
  };

  getAttrCnt(arr) {
    return arr.reduce(function(prev, next) {
      prev[next] = prev[next] + 1 || 1;
      return prev;
    }, {});
  }

  getHorizontalCorrelationData(
    selectedData,
    genders,
    relatedPath,
    relatedAttrs
  ) {
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

  getVerticalCorrelationData(selectedData, genders, relatedPath, relatedAttrs) {
    let results = [];

    if (
      selectedData !== undefined &&
      genders !== undefined &&
      relatedPath !== undefined &&
      relatedAttrs !== undefined
    ) {
      let horizontalData = this.getHorizontalCorrelationData(
        selectedData,
        genders,
        relatedPath,
        relatedAttrs
      );
      for (let attr of relatedAttrs) {
        let obj = { label: attr };
        for (let value of horizontalData) {
          obj[value["name"]] = value[attr];
        }
        results.push(obj);
      }
    }

    return results;
  }

  getFilterForGraph(path) {
    const { filters, filterOptions } = this.props;
    const chosenOptions = _.get(filters, path);
    const allOptions = _.get(filterOptions, path);
    return chosenOptions.length === 0 ? allOptions : chosenOptions;
  }

  getHeightByRecordNum(length) {
    if (length >= 50) {
      return 1500;
    } else if (length >= 40) {
      return 1200;
    } else if (length >= 30) {
      return 900;
    } else if (length >= 20) {
      return 600;
    }
    return 400;
  }

  render() {
    const { position } = this.props;
    const { genderFilter, fields, sourceData } = this.prepareData();
    const height = this.getHeightByRecordNum(sourceData.length);
    let newFields = [];
    if (position === "vertical") newFields = genderFilter;
    else newFields = fields;

    const key = position === "horizontal" ? "month" : "type";
    const value = position === "horizontal" ? "average" : "value";

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: "fold",
      fields: newFields,
      key: key,
      value: value
    });

    let data = dv.rows;

    return (
      <Chart forceFit height={height} data={data}>
        {position === "vertical" && <Coord type="rect" direction="LT" />}
        <Tooltip />
        <Legend />
        {position === "horizontal" && <Axis />}
        {position === "vertical" && <Axis dataKey="value" position="right" />}
        {position === "vertical" && (
          <Axis dataKey="label" label={{ offset: 12 }} />
        )}
        <Bar
          position={position === "horizontal" ? "month*average" : "label*value"}
          color={position === "horizontal" ? "name" : "type"}
          adjust={[{ type: "dodge", marginRatio: 1 / 32 }]}
        />
      </Chart>
    );
  }
}

export default BarChart;
