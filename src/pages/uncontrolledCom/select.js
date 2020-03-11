import React, { Component} from 'react';

export default class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value :'coconut',
        value2 :['coconut']
    }
    this.se = React.createRef();
  }

  handleChange = (event) => {
    this.setState({
        value: event.target.value
    })
  }

  handleChange2 = (event) => {
      var val = event.target.value;
      var values = this.state.value2;
      console.log(val,values)
      const index = values.indexOf(val)
      if(index == -1){
          values.push(val)
      }else{
        values.splice(index,1)
      }
      
    this.setState({
        value2: values
    },function(){
        // console.log(',.,.,',this.state.value2)
    })
  }

  render() {
    return (
      <div style={{padding:'20px 0'}}>
        <div>select 标签 </div>
        <div> 选择你喜欢的风味: {this.state.value}</div>
          <select value={this.state.value} onChange={this.handleChange} >
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>


          <br/>
          <br/>
          <div> 选择你喜欢的风味(多选): {this.state.value2.join(',')}</div>
          <select value={this.state.value2} onChange={this.handleChange2}  multiple>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut" >椰子</option>
            <option value="mango">芒果</option>
          </select>
      </div>
    );
  }
}