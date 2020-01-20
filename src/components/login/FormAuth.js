import React from 'react';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';
import axios from 'axios';
import { useDispatch } from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = (props) => {
  
  const dispatch = useDispatch()
  const classes = useStyles();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    axios.post('https://shoppingcart-django-redux.herokuapp.com/products/api/token/',{
      'username': values.name,
      'password':values.password
    })
    .then(res => {      
      console.log(res.data.access);
      
      dispatch({
        type: "LOGIN",
        token: res.data.access
      })
      props.history.push('/');
      window.location.reload(true);
    })
    .catch(err => {
        console.log(' err in fetching ', err);
        
    })
  }

  return (
    <div className="section is-fullheight">

<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Typography component="h1" variant="h5">
          username: admin
        </Typography>
        <Typography component="h1" variant="h5">
          password: admin
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="name"
                name="name"
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
                value={values.name || ''}
                helperText={errors.name}
                error={typeof errors.name === 'string'}
              />
              <Typography component="h1" variant="h5">
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="component-error"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password || ''}
                helperText={errors.password}
                error={typeof errors.password === 'string'}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
        </form>
      </div>
    </Container>

    </div>
  );
};

export default Form;
