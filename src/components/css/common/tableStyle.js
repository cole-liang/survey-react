import styled from "styled-components";

export const TableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 15px;

  .tr,
  .td,
  .th,
  .sort,
  .filter {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  .td,
  .sort,
  .filter {
    align-items: center;
  }

  .tr,
  .th {
    justify-content: center;
    align-items: stretch;
  }

  .tr {
    border-bottom: 1px solid #dddddd;
  }

  .tr:nth-child(odd) {
    background-color: #fafafa;
  }

  .th {
    background-color: #fafafa;
    justify-content: space-between;
    font-weight: 600;
  }

  .td {
    padding: 10px;
  }

  .sort,
  .filter {
    transition: 0.3s;
  }

  .sort {
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
  }

  .filter {
    padding: 10px 5px;
    max-width: 25px;
  }

  .sort:hover,
  .filter:hover {
    cursor: pointer;
    background-color: #dfdfdf;
  }

  @media only screen and (max-width: 576px) {
    font-size: 10px;
    .sort {
      padding: 10px 5px 10px 10px;
    }
  }
`;

export default {
  TableDiv
};
