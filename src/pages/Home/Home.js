import React, { Component } from 'react';




class Search extends Component {
    render(){
        return (
            <div>
                {this.props.searchType}:<input type="text" />
                <button>Search</button>
            </div>
        )
    }
}

export default class Home extends Component {
    state = {enable: false}

    handleClick = () => {
        this.setState({enable: !this.state.enable});
    }

    render(){
        return (
            <div>
                <h1>Welcome!</h1>
                <Search searchType="Title" />
                <Search  searchType="Content" />
            </div>
        )
    }
}