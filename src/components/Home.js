import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from '@reach/router';
import renderHTML from 'react-render-html';


class Home extends React.Component {
   
        constructor( props ) {
            super( props ); //Super is the reference to the parent function
        
            this.state = {
                loading: false,
                posts: [],
                error: ''
            }
        }
        
        componentDidMount() {
            const psycharmorSiteURL = 'https://learnarmor.com/api/triwest/v1/users/';
            this.setState( {loading: true }, () => {
                axios.get({psycharmorSiteURL} )
                .then( res => {
                    this.setState({loading: false, posts: res.data})
                    console.warn(res.data);
                } )
                .catch( error => this.setState( { loading: false, error: error.response.data } ) )
                
            } );
        }
        render() {
            
        
            const { posts } = this.state;

                return (
                <div>
                    
                    <Navbar/>
                   { posts.length ? (
                       <div className="mt-5 post-container">
                           { posts.map( post =>(
                               <div key={ post.id} className="card border-dark mb-3" style={{width: '50rem'}}>
                                   <div className="card-header">
                                        <Link to={`/post/${post.id}`}>
                                            {post.title.rendered}
                                        </Link>
                                     </div>
                                   
                                     <div className="card-body">
                                         <div className="card-text post-content">
                                             { renderHTML( post.excerpt.rendered ) }
                                         </div>
                                     </div>
                                   </div>
                                   
                           ) ) }
                       </div>
                   ): ''}

                    </div>
                    
            
                
            ) 
        }
        
}

export default Home;