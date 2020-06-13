import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Search from './Search.js';
import '../index.css';

// 5f0c4ce7

class App extends Component {
    state = {movies:[]};

    componentDidMount() {
        this.searchMovie('harry potter');
    }

    searchMovie = (movieQuery) => {
        fetch(`http://www.omdbapi.com/?apikey=5f0c4ce7&s=${movieQuery}`)
        .then((response) => response.json())
        .then((json) => {
            this.setState({movies:json.Search});
        })
        .catch((err)=> {
            console.log(err.message);
        })
    }

    render() {
        return (
            <div>
                <Search searchMovie = {this.searchMovie}/> 
                {
                 this.state.movies ?  ( 
                <div className="container-fluid">
                    <div className="row" id='movies'>
                        {
                            this.state.movies.map((movie) => {
                                const {imdbID,Title,Poster} = movie;
                                return(
                                    <div key={imdbID} className='card card-body col-md-3 col-sm-4 m-3' id='movie-card' style={{cursor:'pointer'}}>
                                        <Link to = {{
                                            pathname:'/movie',
                                            state:{imdbID:imdbID}
                                        }}>
                                        <img src={Poster} className='img-fluid mx-auto poster-img' onError={(e)=>{e.target.onerror = null; e.target.src='https://cm3inc.com/wp-content/uploads/2016/08/npa2.jpg'}}/>
                                        <p className='movie-title'>{Title}</p>
                                        </Link>
                                    </div>
                                )
                            })
                        } 
                    </div>
                </div>) : (<div><h1 className = 'movie-heading' style={{textAlign:'center'}}>Movie Not Found 🥴</h1></div>)
                }
            </div>
        )
    }
}

export default App;