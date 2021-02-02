import { React, Component } from 'react'
import logo from '../../images/logo.svg';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  async callAPI() {
      let response = await fetch('/api')
      console.log(response)
      let data = await response.json()
      console.log(data)
      this.setState({
          apiResponse : data.message
      })
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{this.state.apiResponse}</h1>
            </header>
        </div>
    );
}
}