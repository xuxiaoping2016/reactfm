import * as React from 'react';
import { getExclamationMarks } from '../../utils/helper'

export interface Iprops {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Iprops) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (    <div className="hello">      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}      </div> fdfd   </div>
  );
}

export default Hello;