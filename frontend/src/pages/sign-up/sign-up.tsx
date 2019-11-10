import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import Form from '../../components/form/form';
import Request from '../../components/request/request';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [signupErrors, setSignupErrors] = useState<string[]>([]);

  const submit = (inputs: { email: string; password: string }): void => {
    setSignupErrors([]);
    setLoading(true);

    Request.post({ url: 'signup', body: inputs })
      .then((response: ServerResponse) => {
        if (!response.error) {
          setSignupSuccess(true);
        } else if (Array.isArray(response.error)) {
          const errorList = response.error.map((x) => x.msg);
          setSignupErrors(errorList);
        } else {
          setSignupErrors([response.error]);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignupErrors(['Error signing up']);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    inputs,
    handleInputChange,
    handleSubmit,
  }: {
    inputs: { name: string; email: string; password: string; confirmPassword: string };
    handleInputChange: any;
    handleSubmit: any;
  } = Form({ name: '', email: '', password: '', confirmPassword: '' }, submit);

  return (
    (signupSuccess && <Redirect to="/" />) || (
      <Container component="main" maxWidth="xs">
        <Box mt={5}>
          <Link variant="button" component={RouterLink} to="/" color="textPrimary">
            <Typography variant="h4" align="center" gutterBottom>
              Data Collector
            </Typography>
          </Link>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {signupErrors.map((error, index) => (
              <Typography className={classes.errorMessage} key={index} variant="body1" align="center">
                {error}
              </Typography>
            ))}
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={inputs.name}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputs.email}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs.password}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={inputs.confirmPassword}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/sign-in" variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    )
  );
};

export default SignUp;
