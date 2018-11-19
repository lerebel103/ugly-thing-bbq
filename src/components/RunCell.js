import React from 'react'
import {Paper} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";


const paperStyle = {
  height: "100%",
  padding: 2,
  //backgroundColor: "#eee"
};

const cellStyle = {
  fontSize: "2.1em",
  height: "100%",
  alignItems: "center"
};


const RunCell =(props)=> {
    const { classes, mode, onToggleMode } = props;
    let buttonText = 'Run';
    if (mode === 1) {
      buttonText = 'Stop';
    }

    return (
      <Paper className={classes.paper}
        style={paperStyle}
      >
      <Grid container justify="center" style={cellStyle} >
        <Button size="large" variant="extendedFab" color="primary" aria-label="Start_Stop"
                className={classes.button} onClick={() => { onToggleMode(mode === 1? 0 : 1)}}>
            {buttonText}
        </Button>
      </Grid>
      </Paper>
    )
};

RunCell.propTypes = {
    classes: PropTypes.object,
    mode: PropTypes.number,
    onToggleMode: PropTypes.func.isRequired
};


export default RunCell
