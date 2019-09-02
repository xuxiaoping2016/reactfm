import React, { Component } from 'react';

class Disposable {
    isDisposed: boolean = false;
    dispose() {
        this.isDisposed = true;
    }

}
let o = new Disposable()
console.log(o)

// Activatable Mixin
class Activatable {
    isActive: boolean = false;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

export default class Enum extends Component {
    componentDidMount(){
        // function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        //     return class extends constructor {
        //         newProperty = "new property";
        //         hello = "override";
        //     }
        // }
        
        // @classDecorator
        // class Greeter {
        //     property = "property";
        //     hello: string;
        //     constructor(m: string) {
        //         this.hello = m;
        //     }
        // }
        
        // console.log(new Greeter("world"));

        //=================================================
        
        // function f2(arg: Array<string>): Array<any> {

        //     let arg1 = arg.map((item) => {
        //         return item;
        //     })
        //     return arg1;
        // }
        
        // console.log(f2(['21']));

        function f2<T>(arg2:Array<T>): Array<T> {
            let arg1 = arg2.map((item) => {
                return item;
            })
            return arg1;
        }
        
        f2<number>([1,2,3]);
        
       

    }

    clickHandle = () => {
        o.dispose();
        console.log(o)
    }
    render(){
        return (
            <div>JSX
                <button onClick={this.clickHandle}>设置</button>
            </div>
        )
    }
}