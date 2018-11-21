import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded'
import ConnectedIcon from '@material-ui/icons/SignalCellular4BarOutlined'
import DisconnectedIcon from '@material-ui/icons/SignalCellularNullOutlined'
import PropTypes from "prop-types";
import {MqttClient} from "mqtt";
import {formatTemperature} from "../utils/temperature";

const headerStyle = {
    background: '#eeeeee'
};

const headerText = {
    flex: 1,
    height: "100%",
    textAlign: "left",
    verticalAlign: "center",
    marginTop: 5
};

const settingsStyle = {
    // backgroundColor: "gold",
    padding: 1,
    marginLeft: 10,
};



export default class Header extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        client: PropTypes.instanceOf(MqttClient).isRequired,
        isConnected: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
          ambientTemperature: null
        };
    }

    componentDidMount() {
        // Set up subscription
        const {client} = this.props;

        client.on('message', (topic, message) => {
            if (topic.endsWith(`temperature/board`)) {
                const obj = JSON.parse(message.toString());
                if (obj) {
                    this.setState({ambientTemperature: obj.temp})
                }
            }
        });
    }


    renderConnected() {
        return (
            <Grid container item marginTop={5} >
                <Grid item xs={0}>
                    <ConnectedIcon />
                </Grid>
                <Grid item xs style={headerText}>
                    {formatTemperature(this.state.ambientTemperature)} ambient.
                </Grid>
            </Grid>);
    }

    static renderDisconnected() {
        return <div style={headerText}><DisconnectedIcon/></div>;
    }

    render() {
        const {classes} = this.props;

        return (
        <Grid container style={headerStyle}>
            <Grid item xs marginTop={5}>
                {this.props.isConnected? this.renderConnected(): Header.renderDisconnected()}
            </Grid>
            <Grid item xs={0} align="right">
                <IconButton className={classes.button} aria-label="Settings" style={settingsStyle}>
                    <SettingsApplicationsRounded />
                </IconButton>
            </Grid>
        </Grid>
    )};
}