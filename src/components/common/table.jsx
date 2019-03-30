import { TableDiv } from "../css/common/tableStyle";
import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  data,
  columns,
  onSort,
  sortColumn,
  filters,
  filterOptions,
  onChange
}) => {
  return (
    <TableDiv>
      <TableHeader
        columns={columns}
        filters={filters}
        onSort={onSort}
        sortColumn={sortColumn}
        filterOptions={filterOptions}
        onChange={onChange}
      />
      <TableBody data={data} columns={columns} />
    </TableDiv>
  );
};

export default Table;
