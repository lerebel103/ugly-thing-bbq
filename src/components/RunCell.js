import React from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {MqttClient} from "mqtt";


const paperStyle = {
  height: "100%",
  padding: 2,
  textAlign: "right",
  marginTop: -70,
  marginRight: 30

};


export default class RunCell extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        client: PropTypes.instanceOf(MqttClient).isRequired,
        deviceId: PropTypes.string.isRequired,
    };


    constructor(props) {
        super(props);

        this.state = {
            mode: 0
        }
    }

    componentDidMount(){
        const {client} = this.props;

        client.on('message', (topic, message) => {
            const obj = JSON.parse(message.toString());
            if (obj) {
                if (topic.endsWith('controller/state/reported')) {
                    this.setState({ mode: obj.mode });
                }
            }
        })
    }

    /**
     * Publish new desired mode!
     * @param newMode
     * @private
     */
    _onToggleMode = (newMode) => {
        const {client, deviceId} = this.props;

        // Send new temp to desired state topic!
        client.publish(
            `bbq/${deviceId}/controller/state/desired`,
            JSON.stringify({mode: newMode}));
    };


    render() {
        const {classes} = this.props;
        let buttonText = 'Go!';
        if (this.state.mode === 1) {
            buttonText = 'Stop';
        }

        return (
            <div  style={paperStyle} >
                    <Button variant="fab" color="primary" aria-label="Start_Stop"
                            className={classes.button} onClick={() => {
                        this._onToggleMode(this.state.mode === 1 ? 0 : 1)
                    }}>
                        {buttonText}
                    </Button>
            </div>
        )
    };
}

