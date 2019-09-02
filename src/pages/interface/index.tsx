import React, { Component } from 'react';



export default class InterfaceDemo extends Component {
    componentDidMount(){
        // interface ClockConstructor {
        //     new (hour: number, minute: number): ClockInterface;
        // }
        // interface ClockInterface {
        //     tick(): void;
        // }
        
        // function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        //     return new ctor(hour, minute);
        // }
        
        // class DigitalClock implements ClockInterface {
        //     constructor(h: number, m: number) { }
        //     tick() {
        //         console.log("beep beep");
        //     }
        // }
        // class AnalogClock implements ClockInterface {
        //     constructor(h: number, m: number) { }
        //     tick() {
        //         console.log("tick tock");
        //     }
        // }
        
        // let digital = createClock(DigitalClock, 12, 17);
        // let analog = createClock(AnalogClock, 7, 32);



        //----------------------------------------------------------
        // class Greeter {
        //     greeting: string;
        //     constructor(message: string) {
        //         this.greeting = message;
        //     }
        //     greet() {
        //         return "Hello, " + this.greeting;
        //     }
        // }
        
        // let greeter = new Greeter("world");
        // console.log(greeter)
        // console.log(Greeter)
        // console.log(Greeter.prototype.greeting)

        //-------------------------------------------------------------------
        let passcode = "secret passcode";

        class Employee {
            private _fullName: string = '';

            get fullName(): string {
                return this._fullName;
            }

            set fullName(newName: string) {
                if (passcode && passcode == "secret passcode") {
                    this._fullName = newName;
                }
                else {
                    console.log("Error: Unauthorized update of employee!");
                }
            }
        }

        let employee = new Employee();
        employee.fullName = "Bob Smith";
        if (employee.fullName) {
            alert(employee.fullName);
        }



    }
    render(){
        return (
            <div>
                <div>接口</div>
                
            </div>
        )
    }
}