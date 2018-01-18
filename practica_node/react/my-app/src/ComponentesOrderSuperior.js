import React , {Component} from 'react';
import ReactDOM from 'react-dom';


const HOC = (InnerComponent) => class extends React.Component {
    constructor(){
      super();
      this.state = {count: 0};
    }
    update(){
      this.setState({count: this.state.count + 1})
    }
    componentWillMount(){
      console.log('will mount')
    }
    render(){
      console.log(this.props);

        return (
        <InnerComponent
          {...this.props}
          {...this.state}
          update={this.update.bind(this)}
        />
      )
    }
  }
  
  class App extends React.Component {
      
    render(){
      return (
        <div>
          <Button data="asdsd">buttonss</Button>
          <hr/>
          <LabelHOC>labels</LabelHOC>
        </div>
      )
    }
  }
  
  const Button = HOC((props) =>
    <button onClick={props.update}>{props.children} - {props.count}</button>
  )
  
  class Label extends React.Component {
    componentWillMount(){
      console.log('label will mount')
    }
    render(){
      return (
        <label onMouseMove={this.props.update}>
        {this.props.children} - {this.props.count}
        </label>
      )
    }
  }
  
  const LabelHOC = HOC(Label)
  
 export default App;