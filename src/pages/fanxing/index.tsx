import React, { Component } from 'react';
export interface HelloProps {
    compiler:string;
    framework:string;
}


class Hello extends React.Component<HelloProps, {}> {
    componentDidMount(){
        //泛型类型
        function identity<T>(arg: T): T {
            return arg;
        }
        
        interface GenericIdentityFn{
            <T>(arg:T):T
        }
        let myIdentity: GenericIdentityFn = identity;

        console.log(myIdentity(4))

        class Indentitys{
            name:String;
            constructor(){
                this.name = name;
            }

            identity<T>(arg: T): T {
                return arg;
            }
        }
        const s:Indentitys = new Indentitys();

        // 泛型类
        // class GenericNumber<T>{
        //   zeroValue: T;
        //   add:(x:T,y:T)=>T   
        // }
        // let myGenericNumber = new GenericNumber<number>();
        // myGenericNumber.zeroValue = 0;
        // myGenericNumber.add = function(x,y){return x+y}

        //泛型约束
        // interface Lengthwise {
        //     length: number;
        // }
        
        // function loggingIdentity<T extends Lengthwise>(arg: T): T {
        //     console.log(arg.length);  // Now we know it has a .length property, so no more error
        //     return arg;
        // }
        // console.log(loggingIdentity('st'))

        // class BeeKeeper {
        //     hasMask: boolean;
        // }
        
        // class ZooKeeper {
        //     nametag: string;
        // }
        
        // class Animal {
        //     numLegs: number;
        // }
        
        // class Bee extends Animal {
        //     keeper: BeeKeeper;
        // }
        
        // class Lion extends Animal {
        //     keeper: ZooKeeper;
        // }
        
        // function createInstance<A extends Animal>(c: new () => A): A {
        //     return new c();
        // }
        
        // createInstance(Lion).keeper.nametag;  // typechecks!
        // createInstance(Bee).keeper.hasMask;   // typechecks!
    }
    render() {
        return <h1>泛型示例</h1>;
    }
}
export default Hello;