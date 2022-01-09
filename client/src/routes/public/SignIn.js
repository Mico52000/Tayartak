import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignIn.css';
import NavBar from '../../Components/public/NavBar.js'
import Paper from '@mui/material/Paper';
import Axios from 'axios';

const theme = createTheme();





export default class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      submitError: "",

    }
    this.render = this.render.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    }

    Axios.post("http://localhost:8000/login", credentials).then((resp) => {
      if (resp.data == "username does not exist") {
        this.setState({ submitError: "This username does not exist" })
      } else if (resp.data == "wrong password") {
        this.setState({ submitError: "Incorrect password" })
      }
      else {
        sessionStorage.setItem("accessToken", resp.data.accessToken)
        const loggedUser = resp.data.user;
        sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser))

        if(loggedUser.Type==="user"){
          window.location.href = '/user/home'
        }else{
          window.location.href = '/admin/home'
        }
        
      }

    }).catch((err) => alert(err));
  }

  usernameOnChange(e) {
    this.setState({ username: e.target.value });
  };

  passwordOnChange(e) {
    this.setState({ password: e.target.value });
  };



  render() {
    return (

      <ThemeProvider theme={theme} >
        <NavBar />

        <div className='background' >
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Paper variant="outlined" sx={{
            bgcolor: "rgba(255,255,255,0.6)",
            paddingX: 6,
            paddingY: 7,
            marginBottom: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box
              sx={{
                width: '90%',
                margin: 'auto',
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >


              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form"
                onSubmit={this.handleSubmit}
                noValidate
                sx={{
                  mt: 1,
                }}>
                <TextField
                  onChange={this.usernameOnChange.bind(this)}
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.username}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{
                    input: {
                      height: 50,
                    },
                  }}
                />
                <TextField
                  onChange={this.passwordOnChange.bind(this)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{
                    input: { height: 50 },
                  }}
                />
                <p />
                <Typography component="body2" variant="body2" color="red">
                  {this.state.submitError}
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
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
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                    <br />
                    <Link href="/guest/bookflight" variant="body2">
                      {"Or continue as a guest"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>

            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }
}