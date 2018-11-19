import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home'


class App extends Component {

    constructor(props) {
        super(props);

        // Todo work out where this comes from
        this.state = {deviceId: '000000006978ec81'};

        this._initMqttClient();
    }

    _initMqttClient() {
        // What is our base URL?
        let mqtt = require('mqtt')
        //let mqttHost = window.location.hostname
        let mqttHost = 'bbqpi.local'
        const mqttPort = 9001
        const mqttUrl = 'mqtt://' + mqttHost + ':' + mqttPort


        this._client = mqtt.connect(
            mqttUrl,
            {
                resubscribe: true,
                reconnectPeriod: 1000
            })

        console.log('Connecting to MQTT broker on ' + mqttUrl)

        this._client.on('connect', () => {
            console.log('MQTT Connected')
        })

        this._client.on('offline', () => {
            console.log('DisConnected!!!')
        })

        this._client.on('close', () => {
            console.log('Close!!!')
        })

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this._client.end()
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Home client={this._client} deviceId={this.state.deviceId}/>
            </div>
        );
    }
}

export default App;
