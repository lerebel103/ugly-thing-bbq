import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import './index.css'

const gridCell = {
  height: "100%",
  padding: 2,
  backgroundColor: "#eee"
};


const SetPoint =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCell}
      >
        <p class="set_point">
        {props.temperature}C
        </p>
        <p>
        {props.title} Set Point
        </p>
      </Paper>
    )
}
export default SetPoint
