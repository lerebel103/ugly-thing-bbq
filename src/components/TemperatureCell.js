import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {formatTemperature} from '../utils/temperature.js'
import PropTypes from 'prop-types';
import SetPoint from "./SetPoint";
import {MqttClient} from "mqtt";

const gridCell = {
    height: '100%',
    padding: 2,
};

const temperatureStyle = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    padding: 0,
    margin: 0
};



export default class TemperatureCell extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        deviceId: PropTypes.string.isRequired,
        client: PropTypes.instanceOf(MqttClient).isRequired,
        tempKey: PropTypes.string.isRequired,
        title: PropTypes.string,
    };

    constructor(props){
        super(props);

        // Our temp is our state of course.
        this.state = {
            temperature: null
        }
    }

    componentDidMount() {
        // Set up subscription
        const {client, tempKey} = this.props;

        client.on('message', (topic, message) => {
            if (topic.endsWith(`temperature/${tempKey}`)) {
                const obj = JSON.parse(message.toString());

                if (obj) {
                    this.setState({temperature: obj.temp})
                }
            }
        });
        console.log("Did mount");
    }

    _onNewSetPoint = (newSetPoint) => {
        this.setPoint = newSetPoint;
    };

    render() {
        const {title, classes} = this.props;

        return (
            <Paper className={classes.paper}
                   style={gridCell}>

                <Grid container style={gridCell}>
                    <Grid container alignItems="center" justify="center">
                        <div style={temperatureStyle}>
                            {formatTemperature(this.state.temperature)}
                        </div>
                        &nbsp;&nbsp; {title}
                        <Grid container alignItems="center" justify="center">
                            <SetPoint {...this.props} onNewSetPoint={this._onNewSetPoint}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}