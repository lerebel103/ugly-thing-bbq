import React from 'react'
import {Paper} from '@material-ui/core'

const Fan =(props)=> {
  const { classes } = props;

    return (
      <Paper className={classes.paper}
        //onClick={() => someMethod(10)}
        style={{padding:2}}
      >
        <p>
        {props.rpm} RPM
        </p>
        <p>
        {props.duty_cyle}%
        </p>
      </Paper>
    )
}
export default Fan
