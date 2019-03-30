import styled from "styled-components";

export const TableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  & .tr {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  & .td,
  & .th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  & .th {
    background-color: #fafafa;
    font-weight: 600;
  }

  & .td {
    padding: 10px;
  }

  & .sort,
  & .filter {
    display: inline-block;
    transition: 0.3s;
  }

  & .sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding: 10px 10px 10px 10px;
  }

  & .filter {
    padding: 10px 5px;
  }

  & .sort:hover,
  & .filter:hover {
    cursor: pointer;
    background-color: #dfdfdf;
  }

  & .filterCheckBox {
    display: flex;
    flex-direction: column;
  }
`;

export default {
  TableDiv
};
