import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import TemperatureCell from './TemperatureCell'
import RunCell from './RunCell'
import Fan from './FanCell'
import {MqttClient} from "mqtt";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: "0px",
        color: theme.palette.text.secondary,
    },
});


function FormRow(props) {
    return (
        <React.Fragment>
            <Grid item xs>
                <TemperatureCell {...props} />
            </Grid>
        </React.Fragment>
    );
}

FormRow.propTypes = {
    classes: PropTypes.object.isRequired,
};


class Home extends Component {

    static propTypes = {
        deviceId: PropTypes.string.isRequired,
        client: PropTypes.instanceOf(MqttClient).isRequired
    };

    componentDidMount() {
        // Set up all MQTT subscriptions.
        //
        // This MQTT client is a bit poor on the subscription side in that it can only subscribe
        // to topics in the wide sense and does not support assigning specific handlers for specific topics.
        // It seems we subscribe to a bunch of topics and later use client.on('message', handler), which is not
        // at all efficient and requires each component to further filter on topics on inbound messages.
        //
        const {client} = this.props;
        client.subscribe(`bbq/${this.props.deviceId}/#`);

        // Great, now ask for the latest state
        // Request state
        client.publish(`bbq/${this.props.deviceId}/controller/state/desired`, '{}');
    }

    render() {
        const {client} = this.props;
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={0}>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Pit"
                                 deviceId={this.props.deviceId}
                                 tempKey="pit"
                                 client={client}
                        />
                    </Grid>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Probe A"
                                 deviceId={this.props.deviceId}
                                 tempKey="probe1"
                                 client={client}
                        />
                    </Grid>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Probe B"
                                 deviceId={this.props.deviceId}
                                 tempKey="probe2"
                                 client={client}
                        />
                    </Grid>
                    <Grid item container>
                      <Grid item xs>
                        <Fan classes={this.props.classes} client={client}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item xs>
                        <RunCell classes={this.props.classes} client={client}
                                 deviceId={this.props.deviceId}
                        />
                      </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Home);