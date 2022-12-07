import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AuthService from "../../services/authService";
import {Navigate, useNavigate} from "react-router-dom";
import {setUserLogin} from "../../reducers/userReducer";
import {connect} from "react-redux";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = ({ userLogin, setUserLogin }) => {

  const [isSignUp, setSignUp] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });

    if (!isSignUp) {
      AuthService.login(data.get('username'), data.get('password'))
        .then(data => {
          if (data.resultCode === 0) {
            setUserLogin(data.data);
            navigate("/playlists");
          } else {
            setErrors(data.message)
          }
        }, error => {
          setErrors(error);
        });
    } else {
      AuthService.register(data.get('username'), data.get('email'), data.get('password'))
        .then(data => {
          if (data.resultCode === 0) {
            setAuthorized(data)
            setUserLogin(data);
            navigate("/playlists");
          } else {
            // TODO Here need to call error handler method from Redux
            debugger
            console.log(data)
            setErrors(data.data);
          }
        }, error => {
          setErrors(error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height: '100vh', backgroundColor: '#fff'}}>
        <CssBaseline/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 10,
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h3">
              {!isSignUp ? 'Sign in' : 'Sign up'}
            </Typography>
            {
              !isSignUp
                ? <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="secondary"/>}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" onClick={() => setSignUp(!isSignUp)}>
                        {"Don't have an account?"}<br/> {"Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{mt: 5}}/>
                </Box>
                : <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="secondary"/>}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#signup" variant="body2" onClick={() => setSignUp(!isSignUp)}>
                        {"Don't have an account?"}<br/> {"Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{mt: 5}}/>
                </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default connect(
  ({user: {userLogin}}) => ({userLogin}),
  {setUserLogin}
)(Login);