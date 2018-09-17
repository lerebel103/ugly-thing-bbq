import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import './index.css';

const gridCell = {
  height: "100%",
  padding: 2,
  backgroundColor: "#eee"
};


const Temperature =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={gridCell}
      >
        <p class="temperature">
        {props.temperature}C
        </p>
      </Paper>
    )
}
export default Temperature
