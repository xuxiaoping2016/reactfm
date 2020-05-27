import React, {memo} from 'react';
import classNames from 'classnames';
import './index.css'

interface FixFooterProps {
    children: React.ReactNode | Array<React.ReactElement>;
    className?: string;
    style?: object;
}


const FixFooter = memo((props: FixFooterProps) => {
    console.log('FixFooter renders',props)
    const { children,style, className } = props;
    console.log('children',children)
    return (
        <div style={style} className={classNames('fixed-footer',className)}>
        {children}
        </div>
    );
    
})

// FixFooter.defaultProps = {
//   children: null,
//   className: '',
//   style:{}
// };

interface NameShowProps {
    children: React.ReactNode ;
}
export const NameShow = memo(({children}:NameShowProps) => {
    console.log('NameShow render')
    return <div>{children }</div>
})

export default FixFooter;
