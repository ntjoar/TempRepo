import { React, Component } from 'react'
import logo from '../../images/logo.svg';
import './ISBN.css';

export default class ISBN extends Component {
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
    console.log("hellp")
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">This is the Find ISBN page</h1>
            </header>
        </div>
    );
}
}