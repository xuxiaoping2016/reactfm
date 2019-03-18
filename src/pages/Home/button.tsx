import * as React from 'react';
import classNames from 'classnames';
import style from  './button.less';
import c from './css.css'

export interface ButtonOption {
    text?: string;
    icon?: string;
    onClick?: () => void;
    type?: 'normal' | 'default' | 'danger';
    size?: 'sm' | 'xm' | 'lg';
    href?: string;
    target?: string;
    defalutCls?: string;
    loading?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export default class Button extends React.Component<ButtonOption, any>{
    protected static defaultProps = {
        defalutCls: 'keep-btn',
        loading: false,
        type: 'default',
        size: 'xm'
    }
    constructor(props: ButtonOption) {
        super(props);

    }


    public render() {
        const {
            defalutCls, size, type, onClick, text
          } = this.props;

        const isAny: any = {};

        const classes = classNames({
            [`${defalutCls}`]: defalutCls,
            [`${defalutCls}-${size}`]: size,
            [`${defalutCls}-${type}`]: type,
            '': isAny
        })

        return (
            <div>
                <p className={c.name}>mingzi</p>
                <span className={style['keep-btn']}>fdf</span>
                <button className={classes} type='button' onClick={onClick}  >{text}</button>
            </div>
        )
    }


}