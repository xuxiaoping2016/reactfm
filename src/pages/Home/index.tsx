import * as React from 'react';
import Button from './button'
import './button.less';
import './style.less'

export default class Index extends React.Component{
    
    public render(){
        return (
            <div>
                <button className="keep-btn-d" type="button">fdfds</button>
               <Button
                    text={'按钮'}
                    type={'default'} size='xm'
                    onClick={this.click}
                />
                <Button
                    text={'按钮'}
                    type={'default'} size='sm'
                    onClick={this.click}
                />
                <Button
                    text={'按钮'}
                    type={'danger'} size='lg'
                    onClick={this.click}
                />
            </div>
        )
    }

    private click = () => console.log('我点了！！！')
}
