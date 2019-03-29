import React, { Component } from "react";
import { Table } from "antd";
import utils from "../utils/utils";
import _ from "lodash";

class SurveyTable extends Component {
  state = {
    columns: [],
    filters: []
  };

  async componentDidMount() {
    let attrs = [];
    await new Promise(resolve => {
      setTimeout(() => {
        attrs = this.getFilterAttributes([
          "gender",
          "favoriteFruit",
          "favoriteColor"
        ]);
        resolve();
      }, 0);
    });

    this.setState({
      columns: [
        {
          dataIndex: "name",
          title: "Name",
          sorter: (a, b) => utils.compareStrings(a.name, b.name),
          sortDirections: ["descend", "ascend"]
        },
        {
          dataIndex: "age",
          title: "Age",
          sorter: (a, b) => a.age - b.age,
          sortDirections: ["descend", "ascend"]
        },
        {
          dataIndex: "gender",
          title: "Gender",
          filters: attrs.gender,
          sorter: (a, b) => utils.compareStrings(a.gender, b.gender),
          onFilter: (value, record) => {
            return record.gender === value;
          },
          sortDirections: ["descend", "ascend"]
        },
        {
          dataIndex: "favoriteFruit",
          title: "Favorite Fruit",
          filters: attrs.favoriteFruit,
          sorter: (a, b) =>
            utils.compareStrings(a.favoriteFruit, b.favoriteFruit),
          onFilter: (value, record) => {
            return record.favoriteFruit === value;
          },
          sortDirections: ["descend", "ascend"]
        },
        {
          dataIndex: "favoriteColor",
          title: "Favorite Color",
          filters: attrs.favoriteColor,
          sorter: (a, b) =>
            utils.compareStrings(a.favoriteColor, b.favoriteColor),
          onFilter: (value, record) => {
            return record.favoriteColor === value;
          },
          sortDirections: ["descend", "ascend"]
        }
      ]
    });
  }

  orderFilterAttrsByAsc(array) {
    return _.orderBy(array);
  }

  getFilterAttributes(properties) {
    let results = {};

    for (let property of properties) {
      let attrs = this.props.data.map(item => _.get(item, property));
      attrs = utils.removeDuplicate(attrs);
      attrs = this.orderFilterAttrsByAsc(attrs);
      const result = attrs.map(item => {
        return { text: item, value: item };
      });
      results[property] = result;
    }

    return results;
  }

  onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
    this.setState({ filters });
  };

  render() {
    const { data } = this.props;
    const { columns } = this.state;
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey={item => item._id}
        onChange={this.onChange}
      />
    );
  }
}

export default SurveyTable;
