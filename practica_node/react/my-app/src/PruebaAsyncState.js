import React, { Component } from 'react';

class test extends Component{
    constructor(props){
        super(props);
        this.state={ dato:2}
}

componentDidMount() {
    this.fecthSimu();
}

fecthSimu(){
    
    setTimeout(()=>{
        this.setState({dato:3});
    },2000);
}


render(){

  return <div> {this.state.dato} 
            
        </div>

}

}


export default test;