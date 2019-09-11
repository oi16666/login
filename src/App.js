import React from 'react';
import Home from './components/Home';
import { Router } from "@reach/router";
import SinglePost from './components/SinglePost';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


class App extends React.Component {
    render() {
        return (
           
               <div>
                   <Router>
                        <Home path="/" />
                        <SinglePost path="/posts/:id" />
                        <Login path="/login" />
                        <Dashboard path="/dashboard/:userName" />
                   </Router>
                 </div>
                    
   
        );
    }
}

export default App;