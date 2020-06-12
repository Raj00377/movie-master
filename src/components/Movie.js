import React, { Component } from "react";
import '../index.css';

class Movie extends Component {
    state = { movie: [] };
    componentDidMount() {
        const { imdbID } = this.props.location.state;
        fetch(`http://www.omdbapi.com/?apikey=5f0c4ce7&i=${imdbID}`)
            .then((response) => { return response.json(); })
            .then((json) => {
                this.setState({ movie: json });
                console.log(this.state.movie);
            })
    }

    render() {
        if (!this.state.movie.Ratings) return null;
        return (
            <div>
                <div className='container'>
                    <div className='card my-5'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={this.state.movie.Poster} className='img-fluid movie-image' style={{ width: '100%', height: '100%' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://cm3inc.com/wp-content/uploads/2016/08/npa2.jpg' }} />
                            </div>
                            <div className='col-md-8'>
                                <h3 className='movie-heading'>{this.state.movie.Title}</h3>
                                <ul className="list-group movie-details">
                                    <li className="list-group-item">
                                        <strong>Genre : &nbsp;</strong> {this.state.movie.Genre}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Released : &nbsp;</strong> {this.state.movie.Released}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Director : &nbsp;</strong> {this.state.movie.Director}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Writer : &nbsp;</strong> {this.state.movie.Writer}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Actors : &nbsp;</strong> {this.state.movie.Actors}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Rated : &nbsp;</strong> {this.state.movie.Rated}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Runtime : &nbsp;</strong> {this.state.movie.Runtime}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Production : &nbsp;</strong> {this.state.movie.Production}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Awards : &nbsp;</strong> {this.state.movie.Awards}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '0px' }}>
                            <div className='col-12'>
                                <div className="card plot-card">
                                    <div className="card-header">Plot</div>
                                    <div className="card-body">
                                        <p className="card-text">{this.state.movie.Plot}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '0px' }}>
                            <div className='col-md-4'>
                                <ul className='list-group'>
                                    <li className="list-group-item">
                                        <strong>IMDB Rating : &nbsp;</strong> {this.state.movie.imdbRating} /10
                                            </li>
                                    <li className="list-group-item">
                                        <strong>IMDB Votes : &nbsp;</strong> {this.state.movie.imdbVotes}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Box Office : &nbsp;</strong> {this.state.movie.BoxOffice}
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-8'>
                                <div className="card-deck text-center">
                                    {
                                        this.state.movie.Ratings.map((rating) => {
                                            return (
                                                <div className="card rating-card" key={this.state.movie.imdbID}>
                                                    <div className="card-header">{rating.Source}</div>
                                                    <div className="card-body">
                                                        <p className="card-text">{rating.Value}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;