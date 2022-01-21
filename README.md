
# Tayartak Airlines Web Application Documentation

This is a web application built as a project for the Advanced Computer Lab Course CSEN704.

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)]()

### :gem: Team Members :gem:

[![Mohamed Alaaser](https://img.shields.io/static/v1?label=Mohamed+Alaaser&message=+&color=grey&logo=github)
](https://github.com/mohamedalaaser)

[![Michael George](https://img.shields.io/static/v1?label=Michael+George&message=+&color=grey&logo=github)
](https://github.com/Mico52000)


[![Linah Hossam](https://img.shields.io/static/v1?label=Linah+Hossam&message=+&color=grey&logo=github)
](https://github.com/linah67)

[![Nerimane Mohamed](https://img.shields.io/static/v1?label=Nerimane+Mohamed&message=+&color=grey&logo=github)
](https://github.com/Nerimane107)




### Motivation

The project was built for a university project. We were asked to develop an airline reservation system. We chose Tayartak as our website name and we developed both the frontend and backend of the web application.

### Build Status

[![works badge](https://cdn.jsdelivr.net/gh/nikku/works-on-my-machine@v0.2.0/badge.svg)]()

### Code Style

The React part of the code (front end) uses class components most of the time. Functional components were used sometimes to be able to use react router and pass props from component to another.

### Tech/Framework used

**BackEnd:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


**FrontEnd:**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

### Features
- Admin Features:

-- Create, update and delete flights.

- Guest Features:

-- Search for available flights and view them.

- Registered User Features:

-- Search for available flights and view them.

--Make, update and cancel reservations.

--View all his reservations.

--Edit his account information.

--Pay For His Reservations

### Code Examples

**Frontend component example:**

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
                  borderRadius: '14px'
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




                        <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                          <br/>
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

**Backend API request example:**

      App.post('/login', async (req, res) => {
      

      const user= await UsersModel.findOne({ Username: req.body.username }).exec();
      if (user == null) {
        return res.send("username does not exist");
      }else{

      try {
        if (await bcrypt.compare(req.body.password, user.Password)) {
          const user2 = {
            _id: user._id,
            Username: user.Username,
          }
          const accessToken = generateAccessToken(user2)

          user.Password=req.body.password;
          res.json({accessToken:accessToken,user:user})

        } else {
          res.send("wrong password");
        }
      } catch {
        res.send("errorrr");
      }
    }
    })

### Installation
1. Clone the Repository
2. Navigate to the backend folder and run ``npm install`` to install the backend dependencies.
3. Run ``node index.js`` to start the backend side of the web application
4. Navigate to the frontend folder and run ``npm install`` to install the frontend dependencies.
5. Run ``npm start`` to start the frontend of the web application.
6. Go to http://localhost:3000/ and the website will be running!

### API references
PUT/updateuser 
updates the user information
Request Sample: {
  FirstName: 'nerimane',
  LastName: 'elrefai',
  Email: 'nerimane.elrefai@gmail.com',
  Passport: '376487679',
  Password: '$2b$10$G4K1.y530XaEaJQaBYO8Me/tuOqq2AvF6KP8ZJrFmIO3SCI.AFzvK'}
Response:"Updated"
---------
POST/ChangeParent
Request Sample: body: {
    flightId: '61e5bf1af4b890f18ab04a7f',
    res: '61e89cec7e66ad37f9be6ab1'
  }
  
  
  Respone:{
  numseats: 2,
  from: 'ElSeen',
  to: 'Korea',
  price: 800,
  Rettime: '14-02-2022',
  retnum: '1241414',
  retarrt: '15:00',
  retdept: '13:00',
  olddepCabin: 'economy',
  oldretCabin: 'economy',
  depprice: 200,
  retprice: 200,
  oldId: new ObjectId("61e5bf1af4b890f18ab04a7f"),
  notchanged: '61e5bf56f4b890f18ab04aa5'
}  
--------------------------------------------------------
POST/changeReservation
Request Sample:
 body: {
    bookingId: '61e89cec7e66ad37f9be6ab1',
    Numseats: 2,
    oldprice: 800,
    prevPage: 'http://localhost:3000/user/ChangeParent/61e89cec7e66ad37f9be6ab1/61e5bf1af4b890f18ab04a7f/1',
    newFlightID: '61e5bf1af4b890f18ab04a7f',
    oldFlightID: '61e5bf1af4b890f18ab04a7f',
    IdNotChanged: '61e5bf56f4b890f18ab04aa5',
    num: '1',
    oldCabin: 'economy',
    oldCabinChanged: 'economy',
    newCabin: 'economy',
    TotalPrice: 0
  }
  ------------------------------------------------------------------------
  DELETE/delete/:id
  id is the Flight Id to be deleted by the admin
  Request Sample :
  params : 61e5bf1af4b890f18ab04a7f
  
  Response Sample :
  "item deleted"
  ------------------------------------------------------------------------
  
  POST/create-checkout-session
  
  Request Sample :
  body :{
  prevPage: 'http://localhost:3000/user/bookflight',
  userId: '61ea196d2e0233906320eb51',
  from: 'ElSeen',
  to: 'Korea',
  selectedFlightIDDep: '61e5bf1af4b890f18ab04a7f',  
  selectedFlightIDRet: '61e5bf56f4b890f18ab04aa5',  
  numberOfPassengers: '1',
  cabin: 'business',
  totalPrice: 800
}

Response Sample:
https://checkout.stripe.com/pay/cs_test_a1KKT4RdNqIbjl5chozYL0D3P3NhT1rXONwXs4dautAUcYAeDkSC8UdRJa#fidkdWxOYHwnPyd1blpxYHZxWjA0TkNJRzVBYkZ8MVBqYk1HME5wYlBLXEhuREpvdVZEclNdXUZIQk9rNTJTY0BQUFNcQn1GbE9EXU5WYnB3bWJDdXVoU0pGSU59VEMzQ2xxb1Z8SHV8PVJ8NTVzbGdDdkFXdScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl
---------------------------------------------------------------------------------

GET/reservationsgetBooking
Request Sample :
 Query : 61ea196d2e0233906320eb51
 
 Response Sample :
 [
  {
    _id: new ObjectId("61ea19c72e0233906320ec67"),
    UserId: '61ea196d2e0233906320eb51',
    DepFlight: '61e5bf1af4b890f18ab04a7f',
    RetFlight: '61e5bf56f4b890f18ab04aa5',
    NumSeats: 1,
    Cabin: 'economy',
    TotalPrice: 400,
    CabinDep: 'economy',
    CabinRet: 'economy',
    SeatsDep: [],
    SeatsRet: [],
    __v: 0
  },
  {
    _id: new ObjectId("61ea1a9893f6d9bd514f3277"),
    UserId: '61ea196d2e0233906320eb51',
    DepFlight: '61e5bf1af4b890f18ab04a7f',
    RetFlight: '61e5bf56f4b890f18ab04aa5',
    NumSeats: 1,
    Cabin: 'business',
    TotalPrice: 800,
    CabinDep: 'business',
    CabinRet: 'business',
    SeatsDep: [],
    SeatsRet: [],
    __v: 0
  }
]
---------------------------------------------------------------------------------------
 
 GET/Itinerary/:bookingId
 bookingId is the id of the reservation to be displayed to the user
 
 Request Sample :
 params : 61ea1d074ce073acff0bf915
 
 Response Sample :
 [ [ 9 ], [ 10 ] ]
 -------------------------------------------------------
 
 GET//session/:session_id
 
 Session_id is the id of the payment session opened by stripe
 
 resquest Sample :
 params : cs_test_a1ngJFWZgsQiTWoGUC61LEiOJXPQJOJGeESiC4vcd7Cd3IW9ZElUzgL4GU
 
 Response Sample :
 {
  id: 'cs_test_a1ngJFWZgsQiTWoGUC61LEiOJXPQJOJGeESiC4vcd7Cd3IW9ZElUzgL4GU',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 80000,
  amount_total: 80000,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/user/bookflight',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  currency: 'usd',
  customer: 'cus_L0DT7lZ9MvOrLD',
  customer_creation: 'always',
  customer_details: {
    email: 'nerimane.elrefai@gmail.com',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1642819182,
  livemode: false,
  locale: null,
  metadata: {
    DepId: '61e5bf1af4b890f18ab04a7f',
    RetId: '61e5bf56f4b890f18ab04aa5',
    userId: '61ea196d2e0233906320eb51',
    NumSeats: '1',
    DepFrom: 'ElSeen',
    DepTo: 'Korea',
    DepDate: '12-01-2021',
    DepDTime: '14:00',
    DepATime: '13:00',
    DepFlightNumber: '123123',
    Cabin: 'business',
    TotalPrice: '800',
    RetFrom: 'Korea',
    RetTo: 'ElSeen',
    RetDate: '14-02-2022',
    RetDTime: '13:00',
    RetATime: '15:00',
    RetFlightNumber: '1241414'
  },
  mode: 'payment',
  payment_intent: 'pi_3KKD2QDgCy4UogHB1xAfqdIu',
  payment_method_options: {},
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping: null,
  shipping_address_collection: null,
  shipping_options: [],
  shipping_rate: null,
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/user/success?session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  url: null
}
-------------------------------------------------------------------
 
 

### How to Use?
- Admin

-- Login to your account.

-- From the navigation bar you can create ,edit, delete and search for flights.

- Guest

-- From the website homepage you can search for all the available flights depending on your search criteria.

-- From the navigation bar you can click on the logo button to go back and register for an account or login.

- Registered user

-- Login to your account.

-- From the navigation bar, you can choose to book a trip.

-- You can search for all the available flights and choose your desired flights.

-- After choosing the flights you will be asked to pay for the reservation and you will be redirected to stripe gateway to pay the requested amount.

-- When the payment is completed you will have a chance to pick your seats and then view your Ticket.

-- You can also edit your chosen seats or change a different flight for your reservation from your reservations list. You can go there by choosing My Reservations button from the navigation bar.

### Credits
**Thanks to all the amazing TAs from the Advanced Computer Lab course**
we were offered a lot of guidance from each one of them.
The course was a great experience that made us gain a lot of experience in all web development fields!

### License

MIT License

Copyright (c) `2021` `Take Off AirLines Web Application`


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
