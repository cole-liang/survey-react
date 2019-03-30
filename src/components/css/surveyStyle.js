import styled from "styled-components";

export const SurveyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card > .ant-card-head {
    background-color: #efefef;
  }

  .cardForChart,
  .cardForTable {
    margin-bottom: 30px;
  }

  .cardForChart .ant-card-body {
    padding: 12px 0px 0px 0px;
  }

  .pageSizeInput {
    font-size: 14px;
  }

  .pageSizeInput input {
    width: 50px;
    margin-left: 10px;
  }

  #surveyTable {
    order: ${props => props.order.indexOf("table")};
  }

  #surveyGraph1 {
    order: ${props => props.order.indexOf("graph1")};
  }

  #surveyGraph2 {
    order: ${props => props.order.indexOf("graph2")};
  }

  .horizontalGraph {
    display: block;
    position: relative;
    left: -22px;
  }

  .verticalGraph {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    .horizontalGraph {
      display: none;
    }

    .verticalGraph {
      display: block;
    }

    .cardForTable .ant-card-body {
      padding: 24px;
    }
  }

  @media only screen and (max-width: 576px) {
    .cardForTable .ant-card-body {
      padding: 12px 0px;
    }
    .pageSizeInput {
      font-size: 10px;
    }
  }
`;

export const ControlDiv = styled.div`
  margin: 15px auto;
  padding: 10px;
  text-align: center;
  box-shadow: 2px 2px 5px #dcdcdc;

  button {
    margin-right: 20px;
  }

  button:first-child {
    margin-left: 20px;
  }

  @media only screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
      margin: 5px 20px;
    }
  }
`;
