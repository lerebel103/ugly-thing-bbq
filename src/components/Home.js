import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TemperatureCell from './TemperatureCell'
import RunCell from './RunCell'
import Fan from './FanCell'

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

    constructor(props) {
        super(props);


        this.state = {
            pit: {
                temperature: null,
                setPoint: null
            },
            probe1: {
                temperature: null,
                setPoint: null
            },
            probe2: {
                temperature: null,
                setPoint: null
            },
            fan: {
                rpm: 0,
                dutyCycle: 0
            },
            mode: 1
        }
    }

    componentDidMount() {
        // Set up all MQTT subscriptions
        this._setup_subscriptions();

        // Great, now ask for the latest state
        // Request state
        this.props.client.publish(`bbq/${this.props.deviceId}/controller/state/desired`, '{}');
    }


    _setup_subscriptions() {
        // Blanket subscriptions
        const {client} = this.props;
        client.subscribe(`bbq/${this.props.deviceId}/#`);

        client.on('message', (topic, message) => {
            const obj = JSON.parse(message.toString());
            if (obj) {
                if (topic.endsWith('pit')) {
                    this.setState({ pit: {...this.state.pit, temperature: obj.temp} });
                }

                if (topic.endsWith('probe1')) {
                    this.setState({ probe1: {...this.state.probe1, temperature: obj.temp} });
                }

                if (topic.endsWith('probe2')) {
                    this.setState({ probe2: {...this.state.probe2, temperature: obj.temp} });
                }

                if (topic.endsWith('fan')) {
                    this.setState({ fan: {...this.state.fan, ...obj} });
                }

                if (topic.endsWith('controller/state/reported')) {
                    this.setState({ pit: {...this.state.pit, setPoint: obj.pit.setPoint} });
                    this.setState({ probe1: {...this.state.probe1, setPoint: obj.probe1.setPoint} });
                    this.setState({ probe2: {...this.state.probe2, setPoint: obj.probe2.setPoint} });
                    this.setState({ mode: obj.mode });
                }
            }
        })
    }

    _doNewSetPoint = (key, newTemp) => {
        const {client} = this.props;

        // Send new temp to desired state topic!
        let setPoint = {};
        setPoint[key] = {setPoint: newTemp};
        client.publish(
            `bbq/${this.props.deviceId}/controller/state/desired`,
            JSON.stringify(setPoint));
    };

    _onToggleMode = (newMode) => {
        const {client} = this.props;

        // Send new temp to desired state topic!
        client.publish(
            `bbq/${this.props.deviceId}/controller/state/desired`,
            JSON.stringify({mode: newMode}));
    };

    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={0}>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Pit"
                                 {...this.state.pit}
                                 onNewSetpoint={ temp => this._doNewSetPoint('pit', temp) }
                        />
                    </Grid>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Probe A"
                                 {...this.state.probe1}
                                 onNewSetpoint={ temp => this._doNewSetPoint('probe1', temp) }
                        />
                    </Grid>
                    <Grid item container>
                        <FormRow classes={this.props.classes} title="Probe B"
                                 {...this.state.probe2}
                                 onNewSetpoint={ temp => this._doNewSetPoint('probe2', temp) }
                        />
                    </Grid>
                    <Grid item container>
                      <Grid item xs>
                        <Fan classes={this.props.classes} {...this.state.fan} />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item xs>
                        <RunCell classes={this.props.classes} mode={this.state.mode}
                                 onToggleMode={this._onToggleMode}/>
                      </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
