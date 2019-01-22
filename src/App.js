import React, {Component} from 'react';
import './App.css';
import Home from './components/Home'


class App extends Component {

    constructor(props) {
        super(props);

        // Todo work out where this comes from
        this.state = {
            deviceId: '000000006978ec81',
            connected: false
        };

        this._initMqttClient();
    }

    _initMqttClient() {
        // What is our base URL?
        let mqtt = require('mqtt')
        //let mqttHost = window.location.hostname
        let mqttHost = '192.168.150.87'
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
            this.setState( {...this.state, ...{connected: true}} );
            console.log('Connection is up.')
            // Great, now ask for the latest state
            // Request state
            this._client.publish(`bbq/${this.state.deviceId}/controller/state/desired`, '{}');

        });

        this._client.on('offline', () => {
            this.setState( {...this.state, ...{connected: false}});
            console.log('*** Connection is down.')
        })

        this._client.on('close', () => {
            console.log('*** Connection closed.')
        })

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this._client.end()
    }

    render() {
        return (
            <div className="App">
                <Home client={this._client} {...this.state} />
            </div>
        );
    }
}

export default App;
