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
    <table className="table m-2">
      <TableHeader
        columns={columns}
        filters={filters}
        onSort={onSort}
        sortColumn={sortColumn}
        filterOptions={filterOptions}
        onChange={onChange}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
