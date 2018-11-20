import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {formatTemperature} from "../utils/temperature";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import PropTypes from "prop-types";

const setpointStyle = {
    fontSize: '1.2em',
    padding: '5px',
};

const setPointButtonStyle = {
    backgroundColor: "gold",
    padding: 4,
    marginLeft: 10,
};


export default class SetPoint extends Component {

    static propTypes = {
        deviceId: PropTypes.string.isRequired,
        tempKey: PropTypes.string.isRequired,
        client: PropTypes.object.isRequired,
        classes: PropTypes.any,
    };

    static defaultProps = {
        minTemp: 50,
        maxTemp: 400,
    };

    constructor(props) {
        super(props);

        // setPoint is our state...
        this.state = {
            setPoint: null
        }

    }

    componentDidMount() {
        // Set up subscription
        const {client, tempKey} = this.props;

        client.on('message', (topic, message) => {
            if (topic.endsWith('controller/state/reported')) {
                const obj = JSON.parse(message.toString());
                if (obj && tempKey in obj) {
                    this.setState({setPoint: obj[tempKey].setPoint})
                }
            }
        });
    }

    /**
     * Apply new temperature setpoint
     * @param newTemp
     * @private
     */
    _doNewSetPoint = (newTemp) => {
        const {tempKey, client} = this.props;

        // Send new temp to desired state topic!
        let setPoint = {};
        setPoint[tempKey] = {setPoint: newTemp};
        client.publish(
            `bbq/${this.props.deviceId}/controller/state/desired`,
            JSON.stringify(setPoint));
    };

    /**
     * Handler to increment temperature.
     */
    _tempIncrement = () => {
        let {maxTemp, minTemp} = this.props;
        let setPoint = this.state.setPoint;
        setPoint += 1;
        setPoint = this._capSetPoint(setPoint, maxTemp, minTemp);

        // New set point then
        this._doNewSetPoint(setPoint);
    };

    /**
     * Handler to decrement temperature.
     */
    _tempDecrement = () => {
        let {maxTemp, minTemp} = this.props;
        let setPoint = this.state.setPoint;
        setPoint -= 1;
        setPoint = this._capSetPoint(setPoint, maxTemp, minTemp);

        // New set point then
        this._doNewSetPoint(setPoint);
    };

    /**
     * Make sure we make any new set point fit in [min-max] boundaries.
     * @param temperature New temp
     * @param maxTemp upper bound
     * @param minTemp lower bound
     * @returns {*} safely bounded temp.
     * @private
     */
    _capSetPoint(temperature, maxTemp, minTemp) {
        if (temperature > maxTemp) {
            temperature = maxTemp;
        } else if (temperature < minTemp) {
            temperature = minTemp;
        }

        return temperature;
    }

    render() {
        return <Grid container alignItems="center" justify="center" style={setpointStyle}>
            {formatTemperature(this.state.setPoint)}
            <IconButton className={this.props.classes.button} style={setPointButtonStyle} aria-label="Down"
                        onClick={this._tempDecrement}
            >
                <ArrowDownward/>
            </IconButton>
            <IconButton className={this.props.classes.button} style={setPointButtonStyle} aria-label="Up"
                        onClick={this._tempIncrement}
            >
                <ArrowUpward/>
            </IconButton>
        </Grid>;
    }
}

