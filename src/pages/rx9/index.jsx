import React, { Component } from 'react';
import Rx from 'rxjs';
// import { take, map } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        // var source = Rx.Observable.interval(1000);
        // var example = source.skip(3);

        // example.subscribe({
        //     next: (value) => { console.log(value); },
        //     error: (err) => { console.log('Error: ' + err); },
        //     complete: () => { console.log('complete'); }
        // });


    }


    render(){
        return (
            <div className="container">
                
            </div>
        )
    }
}