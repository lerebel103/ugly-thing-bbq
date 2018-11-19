import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {formatTemperature} from '../utils/temperature.js'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded'
import PropTypes from 'prop-types';

const gridCell = {
    height: "100%",
    padding: 2,
//  backgroundColor: "#eee"
};

const temperatureStyle = {
    fontSize: "1.4em",
    padding: "5px",
};

const setPointButtonStyle = {
    backgroundColor: "gold",
    padding: 4,
    margin: 1,
};

const settingsButtonStyle = {
    padding: 0,
    margin: 0,
};


export default class TemperatureCell extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        title: PropTypes.string,
        minTemp: PropTypes.number,
        maxTemp: PropTypes.number,
        setPoint: PropTypes.number,
        temperature: PropTypes.number,
        onNewSetpoint: PropTypes.func.isRequired
    };

    static defaultProps = {
        minTemp: 50,
        maxTemp: 400,
    };

    constructor(props) {
        super(props);
    }

    /**
     * Handler to increment temperature.
     */
    _tempIncrement = () => {
        let {setPoint, maxTemp, minTemp} = this.props;
        setPoint += 1;
        setPoint = this._capSetpoint(setPoint, maxTemp, minTemp);

        // New set point then
        this.props.onNewSetpoint(setPoint);
    };

    /**
     * Handler to decrement temperature.
     */
    _tempDecrement = () => {
        let {setPoint, maxTemp, minTemp} = this.props;
        setPoint -= 1;
        setPoint = this._capSetpoint(setPoint, maxTemp, minTemp);

        // New set point then
        this.props.onNewSetpoint(setPoint);
    };

    /**
     * Make sure we make any new set point fit in [min-max] boundaries.
     * @param temperature New temp
     * @param maxTemp upper bound
     * @param minTemp lower bound
     * @returns {*} safely bounded temp.
     * @private
     */
    _capSetpoint(temperature, maxTemp, minTemp) {
        if (temperature > maxTemp) {
            temperature = maxTemp;
        } else if (temperature < minTemp) {
            temperature = minTemp;
        }

        console.log(maxTemp, minTemp);

        return temperature;
    }

    render() {
        const {title, classes, setPoint, temperature} = this.props;

        return (
            <Paper className={classes.paper}
                   style={gridCell} >

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
                        <Grid item xs style={{fontSize: "3em", padding: 0, margin: 0}}>
                            {formatTemperature(temperature)}
                        </Grid>
                        <Grid container alignItems="center" justify="center" style={temperatureStyle}>
                            {formatTemperature(setPoint)}
                            <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Down"
                                        onClick={this._tempDecrement}
                            >
                                <ArrowDownward/>
                            </IconButton>
                            <IconButton className={classes.button} style={setPointButtonStyle} aria-label="Up"
                                        onClick={this._tempIncrement}
                            >
                                <ArrowUpward/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}