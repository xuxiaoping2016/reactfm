import React, { Component } from 'react';
import { Form } from 'antd';
import InputCount from './input1'
import CountText from './r'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

@Form.create()
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            refundReason:"3213434好999",
            value2:"32"
        }
    }

    componentDidMount() {
        if (this.state.count == 1) {
            console.log("...")
        }

        setTimeout(() => {
            this.setState({
                value2:"我是中国人，家住78",
                refundReason:"我是中国人，家住78"
            })
            }, 2000);
    }

    onChange = (val) => {
        console.log(val,'..///...')
    }

    handleClick = () => {
        this.setState({
            count: ++this.state.count
        });
    }
    render() {
        const {
            form: { getFieldDecorator },
          } = this.props;
          const {refundReason, value2} = this.state;
        return (
            <div>
                <Form style={{ padding: '10px 10px 0 30px' }}>
                    <FormItem {...formItemLayout} required label="拒绝原因">
                        {getFieldDecorator('refundReason', {
                        
                        rules: [
                            {
                            required: true,
                            message: '请输入拒绝原因',
                            },
                        ],
                        })(<InputCount maxLength = {5} onChange={this.onChange}/>)}
                    </FormItem>

                    {/* <FormItem {...formItemLayout} required label="拒绝原因">
                        {getFieldDecorator('r', {
                        initialValue: value2,
                        rules: [
                            {
                            required: true,
                            message: '请输入拒绝原因',
                            },
                        ],
                        })(<CountText maxLength = {5} />)}
                    </FormItem> */}

                    <InputCount maxLength = {5} />
                </Form>
            </div>
        )
    }
}