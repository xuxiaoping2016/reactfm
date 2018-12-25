import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import classnames from 'classnames';
import style from './merchantDelete.module.less';

const FormItem = Form.Item;
const { TextArea } = Input;

// 倒计时时间
const COUNTDOWN = 60;

@Form.create()
export default class MerchantDelete extends Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func.isRequired,
    }).isRequired,
    sendCode: PropTypes.func.isRequired,
    submitDeleteShop: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      firstSend: true,
      sendingCode: false,
      countdown: 0,
      isSureDel: false,
    };
    this.timer = null;
    this.handleSendCode = this.handleSendCode.bind(this);
    this.countdown = this.countdown.bind(this);
    this.handleChangeSure = this.handleChangeSure.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSendCode(evt) {
    evt.preventDefault();
    this.setState({ firstSend: false });
    if (!this.state.sendingCode) {
      const { sendCode } = this.props;
      sendCode();
      this.countdown();
    }
  }

  countdown() {
    this.setState({ sendingCode: true, countdown: COUNTDOWN });
    this.timer = setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 0) {
        this.setState({ countdown: countdown - 1 });
      } else {
        this.setState({ sendingCode: false });
        clearInterval(this.timer);
      }
    }, 1000);
  }

  handleChangeSure(evt) {
    this.setState({ isSureDel: evt.target.checked });
  }

  handleSubmit() {
    const { form, submitDeleteShop } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.info(values);
        submitDeleteShop(values);
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      phone,
    } = this.props;
    const { firstSend, sendingCode, countdown, isSureDel } = this.state;
    return (
      <Form className={style.deleteForm}>
        <FormItem>
          {getFieldDecorator('reason', {
            rules: [
              {
                required: true,
                message: '必须填写',
              },
            ],
          })(
            <TextArea
              className={style.textarea}
              maxLength={60}
              placeholder="为更好的给您提供服务，请告知我们删除原因"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                message: '必须填写',
              },
            ],
          })(
            <Input
              className={style.input}
              maxLength={8}
              placeholder="请输入验证码"
              suffix={
                <a
                  onClick={this.handleSendCode}
                  className={classnames(
                    style.sendCode,
                    sendingCode && style.sendingCode
                  )}
                >
                  {// eslint-disable-next-line no-nested-ternary
                  sendingCode
                    ? `${countdown}s`
                    : firstSend
                    ? '获取验证码'
                    : '重新获取'}
                </a>
              }
            />
          )}
          {countdown > 0 && (
            <div className={style.deleteTips}>
              短信验证已发送至：+86 {phone}
              ，请注意查收。
            </div>
          )}
        </FormItem>

        <div className={style.delWarning}>
          <i
            className="sfci sfci-warning"
            style={{ fontSize: 20, color: '#FF5050' }}
          />
          <p>删除后所有店铺相关信息将会丢失，且无法恢复，请谨慎操作！</p>
        </div>
        <FormItem>
          <Checkbox value={isSureDel} onChange={this.handleChangeSure} />
          <span style={{ color: '#9797A1' }}>已确认店铺删除风险</span>
        </FormItem>

        <div className={style.modalFooter}>
          <Button
            disabled={!isSureDel}
            className={style.submitBtn}
            type="primary"
            onClick={this.handleSubmit}
          >
            删除
          </Button>
        </div>
      </Form>
    );
  }
}
