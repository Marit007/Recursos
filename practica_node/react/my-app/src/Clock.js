import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date().toTimeString() };
    }
    componentDidMount() { // antes de renderizar
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {  // despues de eliminar
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date().toTimeString()
        });
    }

    render() {
        return <span>{this.state.date}</span>
    }
}

export default Clock;