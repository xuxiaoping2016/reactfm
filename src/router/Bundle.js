import React, {Component} from 'react'

class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentWillMount() {
        console.log(this.props)
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    // componentDidlMount() {
    //     this.load(this.props)
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.load !== this.props.load) {
    //         this.load(nextProps)
    //     }
    // }

    load(props) {
        this.setState({
            mod: null
        });
        console.log(props.load)
        props.load((mod) => {
            console.log("MOD", mod.default)
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.props.children(this.state.mod)
    }
}

export default Bundle;