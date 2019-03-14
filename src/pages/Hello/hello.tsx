import * as React from 'react';
import * as actions from '../../stores/actions';
import { StoreState } from '../../stores/types';
import { connect } from 'react-redux';
import { Dispatch} from 'redux'

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

class Hello extends React.Component<Props>{
  constructor(props:Props){
    super(props)
  }

  public render(){
    const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }
}


function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}




export function mapStateToProps({demo:{enthusiasmLevel, languageName}}: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  }
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}


export default connect(mapStateToProps, mapDispatchToProps,mergeProps)(Hello);