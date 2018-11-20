import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {formatTemperature} from '../utils/temperature.js'
import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded'
import PropTypes from 'prop-types';
import SetPoint from "./SetPoint";

const gridCell = {
    height: '100%',
    padding: 2,
//  backgroundColor: '#eee'
};

const temperatureStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    padding: 0,
    margin: 0
};

const settingsButtonStyle = {
    padding: 0,
    margin: 0,
};


export default class TemperatureCell extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        deviceId: PropTypes.string.isRequired,
        client: PropTypes.object.isRequired,
        tempKey: PropTypes.string.isRequired,
        title: PropTypes.string,
        setPoint: PropTypes.number,
        temperature: PropTypes.number,
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
    }

    render() {
        const {title, classes} = this.props;

        return (
            <Paper className={classes.paper}
                   style={gridCell}>

                <Grid container style={gridCell}>
                    <Grid item xs style={{padding: 0, margin: 5}}>
                        {title}
                    </Grid>
                    <Grid item align="right">
                        <IconButton className={classes.button} style={settingsButtonStyle} aria-label="Settings">
                            <SettingsApplicationsRounded/>
                        </IconButton>
                    </Grid>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs style={temperatureStyle}>
                            {formatTemperature(this.state.temperature)}
                        </Grid>
                        <SetPoint {...this.props}/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}