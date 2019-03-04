import React from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import './demo0.css'

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {length:10};
  };

  addLength(){
      let newLength;
      if(this.state.length){
          newLength = 0;
      }else{
          newLength = 10;
      }
      this.setState({
          length:newLength
      })
  }

  render() {
      const {length} = this.state;
      let boxes = [];
      for(let i = 0,len = length; i<10; i++){
          boxes.push({
              scale:length ? 0 : 1
          })
      }
    return (
      <div>
        <div>
          {/* {this.state.length > 0 ? (
            
          ) : null} */}
          <StaggeredMotion defaultStyles={boxes}
              styles={prevStyles => {  //prevStyle  上一次样式计算值
                //   console.log(prevStyles)
                  return prevStyles.map((item, i) => {
                    return i === 0
                      ? { scale: spring(length ? 1 : 0, { ...presets.noWobble }) }
                      : prevStyles[i - 1]
                  })

              }}>
              {interpolatingStyles =>
                <div className="staggeredmotion">
                  {interpolatingStyles.map((item, i) => {
                    return (
                      <div className="box2"
                        key={i}
                        style={{
                          transform: `scale(${item.scale}, ${item.scale})`
                        }}></div>
                    )
                  })}
                </div>
              }
            </StaggeredMotion>
        </div>
        <button onClick={this.addLength.bind(this)}>run</button>
      </div>
    );
  };
}