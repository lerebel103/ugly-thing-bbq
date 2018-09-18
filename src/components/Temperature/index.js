import React from 'react'
import {Paper} from '@material-ui/core'
import formatTemperature from '../../utils/temperature.js'


const gridCellStyle = {
  height: "100%",
  padding: 2,
  backgroundColor: "#eee"
};

const temperatureStyle = {
  fontSize: "2.1em"
};


const Temperature =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCellStyle}
      >
        <p style={temperatureStyle}>
          {formatTemperature(props.temperature)}
        </p>
      </Paper>
    )
}
export default Temperature
