import React, {Component} from 'react';

class ApiReact extends Component {
    constructor(props){
        super(props)
        this.state ={
            numberFunction:0,
            numberObject: 0
        }
    }

    changeNumberObject=()=>{

        this.setState(
            {numberObject:this.state.numberObject+1}
        );
    
         this.setState(
            {numberObject:this.state.numberObject+1}
        );
    
         this.setState(
            {numberObject:this.state.numberObject+1}
         );
    
          this.setState(
            {numberObject:this.state.numberObject+1}
         );
         //只有最后这个setState才生效 
    };

    changeNumberFunction=()=>{

        this.setState((preState)=>{
            return  {numberFunction:preState.numberFunction+1}
        })
    
        this.setState((preState)=>{
            return  {numberFunction:preState.numberFunction+1}
        })
    
        this.setState((preState)=>{
            return  {numberFunction:preState.numberFunction+1}
        })
    
        this.setState((preState)=>{
            return  {numberFunction:preState.numberFunction+1}
        })
        //每个都回执行 
    };
    
    componentDidUpdate(){
        console.log(`The expected  numberObject is 4,real value is ${this.state.numberObject}`);
        console.log(`The expected  numberFunction is 4,real value is ${this.state.numberFunction}`);
    }

    render() {
        
        return (
            <div>
                <span onClick={this.changeNumberObject}  style={{marginRight:"20px"}}>changeNumberObject</span>
                <span onClick={this.changeNumberFunction}>changeNumberFunction</span>
            </div>
        )
    }
}


export default ApiReact;
