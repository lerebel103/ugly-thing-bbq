import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {MqttClient} from "mqtt";

const gridCell = {
  height: "100%",
  padding: 2,
};

export default class Fan extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        client: PropTypes.instanceOf(MqttClient).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            rpm: 0,
            dutyCycle: 0
        };
    }

    componentDidMount() {
        // Set up subscription
        const {client} = this.props;

        client.on('message', (topic, message) => {
            if (topic.endsWith(`fan`)) {
                const obj = JSON.parse(message.toString());
                if (obj) {
                    this.setState({ ...obj });
                }
            }
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}
                   style={gridCell}
            >
                <Grid container>
                    <Grid item xs style={{padding: 0, margin: 5}}>
                        Fan
                    </Grid>
                    <Grid container alignItems="center" justify="center">
                        <Grid item style={{fontSize: "1.4em", padding: 0, margin: 0}}>
                            <Grid>
                                {this.state.rpm} RPM
                                <Grid>
                                </Grid>
                                {this.state.dutyCycle}%
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
};
