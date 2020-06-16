import React, { Component } from "react";
import Search from './Search.js';
import '../index.css';
import Movie from "./Movie.js";

class App extends Component {
    state = { movies: [], clicked_1: false, clicked_2: false, id: '' };

    componentDidMount() {
        this.searchMovie('harry potter');
    }

    searchMovie = (movieQuery) => {
        fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieQuery}`)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw Error(`Status Code ${response.status}`);
            })
            .then((json) => {
                this.setState({ movies: json.Search });
            })
            .catch((err) => {
                console.log(err.message);
                this.setState({movies:null})
            })
    }

    movieComponent = (imdbID) => {
        this.setState({ clicked_1: !this.state.clicked_1, id: imdbID });
        if (this.state.clicked_1 == false && imdbID != null) {
            this.setState({ clicked_2: true });
        }
        else if (this.state.clicked_1 == true && imdbID != null) {
            this.setState({ clicked_2: false });
        }
    }


    render() {
        return (
            <div>
                <Search searchMovie={this.searchMovie} />
                {
                    this.state.movies ? (
                        <div className="container-fluid">
                            <div className="row" id='movies'>
                                {
                                    this.state.movies.map((movie) => {
                                        const { imdbID, Title, Poster } = movie;
                                        return (
                                            <div key={imdbID} className='card card-body col-md-3 col-sm-4 m-3' id='movie-card' style={{ cursor: 'pointer' }} onClick={() => { this.movieComponent(imdbID) }}>
                                                <img src={Poster} className='img-fluid mx-auto poster-img' onError={(e) => { e.target.onerror = null; e.target.src = 'https://cm3inc.com/wp-content/uploads/2016/08/npa2.jpg' }} />
                                                <p className='movie-title'>{Title}</p>
                                            </div>

                                        )

                                    })
                                }
                            </div>
                        </div>) : (<div><h1 className='movie-heading' style={{ textAlign: 'center' }}>Movie Not Found &#127917;</h1></div>)
                }
                {
                    this.state.clicked_1 ? <Movie imdbID={this.state.id} /> : null
                }
                {
                    this.state.clicked_2 ? null : <Movie imdbID={this.state.id} />
                }

            </div>
        )
    }
}

export default App;