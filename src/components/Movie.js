import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../index.css';

class Movie extends Component {
    state = { movie: [], visible: true };

    componentDidMount() {
        if (this.props.imdbID.trim() == "") return null;
        const { imdbID } = this.props;
        fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${imdbID}`)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw Error(`Status Code ${response.status}`);
            })
            .then((json) => {
                this.setState({ movie: json });
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    toggleModal = () => {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        if (this.props.imdbID.trim() == "") return null;
        if (!this.state.movie.Ratings) return null;
        return (
            <div>
                <Modal isOpen={this.state.visible}>
                    <ModalHeader toggle={this.toggleModal}>
                    </ModalHeader>
                    <ModalBody>
                        <div className='container-fluid'>
                            <div className='row' style={{ marginBottom: '30px' }}>
                                <div className='col-md-4'>
                                    <img src={this.state.movie.Poster} className='img-fluid movie-image' style={{ width: '100%', height: '100%' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://cm3inc.com/wp-content/uploads/2016/08/npa2.jpg' }} />
                                </div>
                                <div className='col-md-8'>
                                    <h3 className='movie-heading'>{this.state.movie.Title}</h3>
                                    <ul className="list-group movie-details">
                                        <li className="list-group-item">
                                            <strong>Genre : &nbsp;</strong> {this.state.movie.Genre ? this.state.movie.Genre : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Released : &nbsp;</strong> {this.state.movie.Released ? this.state.movie.Released : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Director : &nbsp;</strong> {this.state.movie.Director ? this.state.movie.Director : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Writer : &nbsp;</strong> {this.state.movie.Writer ? this.state.movie.Writer : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Actors : &nbsp;</strong> {this.state.movie.Actors ? this.state.movie.Actors : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Rated : &nbsp;</strong> {this.state.movie.Rated ? this.state.movie.Rated : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Runtime : &nbsp;</strong> {this.state.movie.Runtime ? this.state.movie.Runtime : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Production : &nbsp;</strong> {this.state.movie.Production ? this.state.movie.Production : <span>N/A</span>}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Awards : &nbsp;</strong> {this.state.movie.Awards}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: '0px', marginBottom: '30px' }}>
                                <div className='col-12'>
                                    <div className="card plot-card">
                                        <div className="card-header">Plot</div>
                                        <div className="card-body">
                                            <p className="card-text">{this.state.movie.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: '0px', }}>
                                <div className='col-md-4'>
                                    <ul className='list-group' style={{ marginBottom: '35px' }}>
                                        <li className="list-group-item">
                                            <strong>IMDB Rating : &nbsp;</strong> {this.state.movie.imdbRating} /10
                                                    </li>
                                        <li className="list-group-item">
                                            <strong>IMDB Votes : &nbsp;</strong> {this.state.movie.imdbVotes}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Box Office : &nbsp;</strong> {this.state.movie.BoxOffice ? this.state.movie.BoxOffice : <span>N/A</span>}
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-md-8'>
                                    <div className="card-deck text-center">
                                        {

                                            this.state.movie.Ratings.map((rating, index) => {
                                                return (
                                                    <div key={index} className="card rating-card">
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
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-danger btn-lg" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>

                </Modal >
                {/* <Modal isOpen={this.state.visible}>
                    <ModalHeader toggle={this.toggleModal}>Hello</ModalHeader>
                    <ModalBody>loremissdfasdfsajdfhjasdhfksfhk</ModalBody>
                    <ModalFooter>Close</ModalFooter>
                </Modal> */}

            </div >
        )
    }
}

export default Movie;