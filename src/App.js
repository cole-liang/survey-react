import React, { Component } from "react";
import { Container } from "./components/css/appStyle";
import Survey from "./components/survey";

class App extends Component {
  handleScrollTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <Container>
        <header>
          <span>Survey Data Panal</span>
        </header>
        <div className="content">
          <Survey />
        </div>
        <footer>
          <span>
            <i className="fa fa-copyright" /> Copyright LWX(Cole) 2019
          </span>
        </footer>
        <div className="topBtn" onClick={this.handleScrollTop}>
          Top
        </div>
      </Container>
    );
  }
}

export default App;
