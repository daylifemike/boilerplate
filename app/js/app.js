import React from 'react';
import {render} from 'react-dom';
import Content from './content'

class App extends React.Component {
    render () {
        return <p> Hello React! - {this.props.text}</p>;
    }
}

render(<App text={Content} />, document.getElementById('app'));