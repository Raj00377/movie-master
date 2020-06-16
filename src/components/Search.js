import React, { Component } from "react";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';

class Search extends Component {
    state = { movieQuery: '', valid: false, onlyCharAndNum: false };


    validation() {
        const regex = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
        const onlyCharAndNum = regex.test(event.target.value);
        this.setState({ onlyCharAndNum });
    }
    searchQuery = (event) => {
        this.setState({ movieQuery: event.target.value });
        if (event.target.value.length > 2 && event.target.value!=" ") {
            this.validation();
            if (this.state.onlyCharAndNum)
                this.setState({ valid: true });
            else
                this.setState({ valid: false })
        }
        else {
            this.setState({ valid: false });
        }
    }

    handleKeyPress = (event) => {
        if (this.state.valid) {
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
                        <PopoverBody style={{ fontFamily: "Merienda One", fontSize: '15px' }}>Enter atleast 3 letters to search</PopoverBody>
                    </UncontrolledPopover>}
                </div>
            </div>
        )
    }
}

export default Search;