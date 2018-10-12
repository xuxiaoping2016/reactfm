import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


@Form.create({
  mapPropsToFields:(props) => {
    // console.log("mapPropsToFields",props)
  },
  onFieldsChange:(props, fields) => {
    // props  match location history 等组件属性
    // fields  发生变化的当前表单域相关的信息 {
//       dirty: true
// errors: undefined
// name: "userName"
// touched: true
// validating: true
// value: "4"}
    // console.log("onFieldsChange",props, fields)
  },
  onValuesChange:(props, changedValues, allValues) => {
    // changedValues  发生变化的当前表单域的键值对 {userName: "4"}
    // allValues 所有表单域的 键值对
    // console.log("onValuesChange",props, changedValues, allValues)
  },
})
class HorizontalLoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"898"
        }
    }
  componentDidMount() {
    console.log("componentDidMount")
    // console.log("dfdfd.......",this.props.form)
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  testMethod = () => {
    const {getFieldsError, getFieldError, getFieldsValue, getFieldValue, isFieldsTouched ,isFieldTouched
    ,isFieldValidating,resetFields, setFields, setFieldsValue} = this.props.form;
    // 获取某个输入控件的 Error 返回一个数组  ["不少于6个字符"]，没有错误  返回undefined
    // console.log(getFieldError("userName"))
// 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
// 返回值 是一个对象  {
//     password: ["Please input your Password!"]
// userName: undefined
// }   
    // console.log(getFieldsError())

    // console.log(getFieldValue("userName"))
    // console.log(getFieldsValue())

    // console.log(isFieldTouched("userName"))
    // console.log(isFieldTouched("password"))
    // console.log(isFieldsTouched())

    // console.log(isFieldValidating("userName"))
    // console.log(isFieldValidating("password"))

    setFieldsValue([{userName:"xuxiopioi"}])
  }

  render() {
    console.log("render")
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
          <Button onClick={this.testMethod}>getFieldsError</Button>
        </FormItem>
      </Form>
    );
  }
}
export default HorizontalLoginForm;