import React from "react";
import { Input } from "antd";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      name="searchBox"
      className="searchBox"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
