import React, { Component } from "react";
import { Chart, Tooltip, Axis, Legend, Bar } from "viser-react";
const DataSet = require("@antv/data-set");

class BarChart extends Component {
  prepareData = () => {
    const { sourceData, fields } = this.props;

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: "fold",
      fields: fields,
      key: "月份",
      value: "月均降雨量"
    });
    return dv.rows;
  };

  render() {
    const data = this.prepareData();

    return (
      <Chart forceFit height={400} data={data}>
        <Tooltip />
        <Axis />
        <Legend />
        <Bar
          position="月份*月均降雨量"
          color="name"
          adjust={[{ type: "dodge", marginRatio: 1 / 32 }]}
        />
      </Chart>
    );
  }
}

export default BarChart;
