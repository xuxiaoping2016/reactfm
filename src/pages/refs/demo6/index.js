import React from 'react';

import FancyButton from './FancyButton';

const Demo6 = () => {
    const ref = React.createRef();
    
    const handle = () => console.log(ref);

    return (
        <FancyButton
            label="demo6 - Click Me"
            handle = { handle }
            forwardref={ref}
        />
    );
}


export default Demo6;