import React, { Component } from "react";

import TechItem from "../components/TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  //executado assim que aparece na tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  //executado sempre q houver alterações nas props ou estados
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  // executado quando o component deixa de existir
  componentWillMount() {}

  handlerInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handlerDelete = tech => {
    this.setState({
      techs: this.state.techs.filter(tec => tec !== tech)
    });
  };

  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              tech={tech}
              key={tech}
              onDelete={() => this.handlerDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handlerInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
