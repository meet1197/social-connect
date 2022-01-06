import React from "react";

class DoS extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paths: [] };
  }

  isVisited = new Array(this.props.users.length);
  userNameList = this.props.users.map((u) => u.name);
  adjList = new Array(this.props.users.length);

  printAllPathsUtil(u, d, localPathList) {
    if (u == d) {
      this.state.paths.push(localPathList.join(" > "));
      this.setState({ ...this.state });
      return;
    }

    this.isVisited[u] = true;

    for (let i = 0; i < this.adjList[u].length; i++) {
      if (!this.isVisited[this.userNameList.indexOf(this.adjList[u][i])]) {
        localPathList.push(this.adjList[u][i]);

        this.printAllPathsUtil(
          this.userNameList.indexOf(this.adjList[u][i]),
          d,
          localPathList
        );

        localPathList.splice(localPathList.indexOf(this.adjList[u][i]), 1);
      }
    }

    this.isVisited[u] = false;
  }

  componentDidMount() {
    let user1 = this.props.user1;
    let user2 = this.props.user2;

    this.props.users.forEach((u, i) => {
      this.adjList[i] = u.friends;
    });

    for (let i = 0; i < this.props.users.length; i++) this.isVisited[i] = false;
    let pathList = [];

    pathList.push(user1);

    let u1 = this.userNameList.indexOf(user1);
    let u2 = this.userNameList.indexOf(user2);

    this.printAllPathsUtil(u1, u2, pathList);
  }

  render() {
    console.log(this.state.paths);
    return (
      <ol>
        {this.state.paths.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ol>
    );
  }
}

export default DoS;
