import React , {Component} from 'react';

class Events extends Component {
    constructor(props)
    {
        super(props);
        this.state ={currentEvent:""};
        this.update = this.update.bind(this);
    }

    update(e){
        this.setState({currentEvent:e.type});
    }
    
    render (){
        return <div><textarea col ='10' rows='10' onCopy ={this.update} onBlur={this.update}
                onCopy={this.update} onChange={this.update}> </textarea>
                <div>{this.state.currentEvent}</div></div>
    }
}

export default Events;