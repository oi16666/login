import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Redirect } from "@reach/router";

class Login extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            username:'',
            password: '',
            userNiceName: '',
            userEmail: '',
            LoggedIn: false,
            loading: false,
            error: '',
            loginName: ''
        };
    }
  
   onFormSubmit = (event) => {
       event.preventDefault();
       const siteUrl = " https://learnarmor.com/api/triwest/v1/users"
       const loginData = {
           username: this.state.username,
           password: this.state.password,
       };
       const token = {
            headers : {
                    Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbGVhcm5hcm1vci5jb20iLCJpYXQiOjE1NjYzMTQ2ODgsIm5iZiI6MTU2NjMxNDY4OCwiZXhwIjoxNTk3ODUwNjg4LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIyIn19fQ.g97FY2eMTEct-O7NbH4f9eL6C2GpuXDx8L1VnFHqN88'}
       };
       console.warn(siteUrl);

        this.setState({loading: true}, () => {
            axios.get(`${siteUrl}`, token)
            .then( res => {
                console.warn(res.data);
     
                if(undefined === res.data.token){
          
                    this.setState({ error: res.data.message, loading: false }); //If the loading is undefine the loading will be false
                    return;
                }
                
       
                
 

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userName', res.data.user_nicename);
            
             

                this.setState({
                    loading: false, 
                    token: res.data.token,
                    userNiceName: res.data.user_display_name,
                    userEmail: res.data.user_email,
                    loggedIn:true,
                    loginName: res.data.login_name
                })
            }).catch( err=> {
                this.setState({ error:err.response.data, loading: false});
            })

        } )
   };
    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };
   
    render() {

        const { username, password, loggedIn, userNiceName, loginName } = this.state;

        //If userNiceName have a value then get the value from local storage.
        const user = ( userNiceName ) ? userNiceName : localStorage.getItem( 'userName' );

        //If log in is true or local storage have token then redirected to dashboard.
       if(loggedIn || localStorage.getItem('token') ) {
           return ( <Redirect to={`/dashboard/${user}`} noThrow /> )
       } else {
            return (
              <div>
                <Navbar />
                <form onSubmit={ this.onFormSubmit } style={{margin: '40px'}}>
                         <label className="form-group">
                             Username:
                             <input 
                                 type="text"
                                 className="form-control"
                                 name= "username"
                                 value={username}
                                 onChange={this.handleOnChange}
                             />
                         </label>
             <br/>      
                <label className="form-group">
                             Password:
                             <input 
                                 type="password"
                                 className="form-control"
                                 name= "password"
                                 value={password}
                                 onChange={this.handleOnChange}
                             />
                             </label>
                             <br/>
                             <button className="btn btn-primary mb-3" type="submit">Login</button>
                             </form>
                             <div className="ui container" style={{marginTop: '50px'}}>
                            
                   
                              
                            </div>
                
            </div>

        
         );
       }
    }
}

export default Login;