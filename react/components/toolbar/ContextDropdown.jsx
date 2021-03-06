import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const mapStateToProps = (state, { match }) => ({
  contexts: state.contexts,
  currentContext: match.params.context,
});

const ContextDropdown = ({ classes, currentContext, contexts }) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="context-dropdown">Context</InputLabel>
      <Select
        value={currentContext}
        inputProps={{
          name: 'context',
          id: 'context-dropdown',
        }}
      >
        {contexts.items.map(context => (
          <MenuItem component={Link} to={'/' + context} value={context} key={context}>
            {context}
          </MenuItem>
        ))}
        {contexts.loading && <MenuItem value={currentContext}>{currentContext}</MenuItem>}
        {contexts.loading && <MenuItem><CircularProgress /></MenuItem>}
        {contexts.error && <MenuItem>Error!</MenuItem>}
      </Select>
    </FormControl>
  );
};

ContextDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  contexts: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    items: PropTypes.array.isRequired,
  }).isRequired,
  currentContext: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ContextDropdown)));
