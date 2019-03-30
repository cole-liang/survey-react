import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      // <div className="tbody">
      <React.Fragment>
        {data.map(item => (
          <div className="tr" key={item._id}>
            {columns.map(column => (
              <div className="td" key={column.path || column.key}>
                {this.renderCell(item, column)}
              </div>
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TableBody;
