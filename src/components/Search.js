import React, { Component } from "react";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';




class Search extends Component {
    state = { movieQuery: '', valid: false };
    searchQuery = (event) => {
        this.setState({ movieQuery: event.target.value });
        if (event.target.value.length > 2) {
            this.setState({ valid: true });
        }
        else {
            this.setState({ valid: false });
        }
    }

    handleKeyPress = (event) => {
        if (event.target.value.length > 2) {
            if (event.key === "Enter") {
                this.props.searchMovie(this.state.movieQuery);
            }
        }
    }


    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Movie Master</h1>
                    <p className="lead" style={{ marginBottom: '10px' }}>This is a handy site to search details for a movie or series based on IMDB Data.</p>
                    <input className="search-input mr-2"
                        placeholder="Search Movie/Series Here..."
                        onChange={this.searchQuery}
                        onKeyPress={this.handleKeyPress}
                        id="PopoverFocus"
                    />
                    <button className="btn btn-primary my-2" disabled={!this.state.valid} onClick={() => this.props.searchMovie(this.state.movieQuery)}>Search</button>
                    {this.state.valid ? null : <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                        <PopoverBody style={{fontFamily:"Merienda One",fontSize:'15px'}}>Enter atleast 3 letters to search</PopoverBody>
                    </UncontrolledPopover>}
                </div>
            </div>
        )
    }
}

export default Search;