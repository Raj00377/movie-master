import React, { Component } from "react";


class Search extends Component {
    state = { movieQuery: '' };

    searchQuery = (event) => {
        this.setState({ movieQuery: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.props.searchMovie(this.state.movieQuery);
        }
    }


    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Movie Master</h1>
                    <p className="lead" style={{marginBottom:'10px'}}>This is a handy site to search details for a movie or series based on IMDB Data.</p>
                    <input className="search-input mr-2"
                        placeholder="Search Movie/Series Here..."
                        onChange={this.searchQuery}
                        onKeyPress={this.handleKeyPress} 
                    />
                    <button className="btn btn-primary my-2" onClick={this.props.searchMovie}>Search</button>
                </div>
            </div>
        )
    }
}

export default Search;