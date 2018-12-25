import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Upload, Input, message as AntMessage } from 'antd';
import style from './merchantEdit.module.less';
import Loading from '../loading';
import WeimobCascader from '../weimobCascader';

const FormItem = Form.Item;
const keysMap = {
  id: 'value',
  name: 'label',
};
/* eslint-disable react/no-did-mount-set-state */
class MerchantEdit extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    utils: PropTypes.shape({
      convertToCascader: PropTypes.func.isRequired,
      convertDataToForm: PropTypes.func.isRequired,
      newLocation: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    callbacks: PropTypes.shape({
      fetchLogo: PropTypes.func.isRequired,
      uploadLogo: PropTypes.func.isRequired,
      modifyMerchant: PropTypes.func.isRequired,
    }).isRequired,

    operatingPid: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    wid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    updateParentStore: PropTypes.func.isRequired,
    onSubmitEditShop: PropTypes.func.isRequired,

    isShowItem: PropTypes.number,
  };

  static defaultProps = {
    isShowItem: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      img: 'https://basis.console.weimob.com/assets/images/icons/user.jpg',
      isNamewError: false,
      industries: [],
      isShowAll: false, // 是否展开全部
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      form: { setFields },
      operatingPid = 1,
      industries = [],
      callbacks: { fetchLogo },
      isShowItem,
    } = this.props;
    const { img } = this.state;
    this.setState({ loading: true });
    const { data: infoData } = await fetchLogo(operatingPid);
    this.setState({ loading: false });

    if (isShowItem === 4) {
      infoData.merchantName = '';
      infoData.parentIndustryId = '';
      infoData.childIndustryId = '';
    }
    if (industries && infoData) {
      this.setState({
        img: infoData.logo === 'undefined' ? img : infoData.logo,
        industries,
      });
      await setFields(this.mapPropsToForm(infoData));
    }
  }

  mapPropsToForm = data => {
    const {
      utils: { convertDataToForm },
    } = this.props;
    const rawData = {
      merchantName: data.merchantName,
      address: [data.province, data.city, data.region],
      industry: [data.parentIndustryId, data.childIndustryId],
      logo: data.logo,
      desc: data.desc,
      name: data.name,
      qq: data.qq,
      weixin: data.weixin,
      phone: data.phone,
      mail: data.mail,
    };
    return convertDataToForm(rawData);
  };

  handleRemove = () => {
    this.setState({ img: '' });
  };

  beforeUpload = file => {
    const { size } = file;
    const {
      form: { setFields },
    } = this.props;
    if (size > 1024 * 1024) {
      setFields({ logo: { errors: [new Error('图片不能超过1M')] } });
      this.setState({ img: '' });
      return false;
    }
    return true;
  };

  customRequest = ({ file }) => {
    const {
      operatingPid,
      wid,
      callbacks: { uploadLogo },
    } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    uploadLogo(operatingPid, wid, formData).then(({ data }) => {
      this.setState({ img: data });
    });
  };

  showAll = () => {
    this.setState({
      isShowAll: true,
    });
  };

  handleSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
      updateParentStore,
      operatingPid,
      wid,
      callbacks: { modifyMerchant },
      onSubmitEditShop,
    } = this.props;
    const { img } = this.state;
    onSubmitEditShop();
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = values;
        const [province, city, region] = values.address;
        const [parentIndustryId, childIndustryId] = values.industry;
        formData.province = province;
        formData.city = city;
        formData.region = Number(region);
        formData.parentIndustryId = parentIndustryId;
        formData.childIndustryId = childIndustryId;
        formData.name = values.name.trim();
        formData.logo = img;
        formData.wid = wid;
        formData.pid = Number(operatingPid);
        delete formData.address;
        delete formData.industry;
        const { data, errmsg } = await modifyMerchant(formData);
        if (data > 0) {
          updateParentStore();
        } else {
          AntMessage.error(errmsg);
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue },
      utils: { convertToCascader, newLocation },
    } = this.props;
    const self = this;
    const { img, isNamewError, industries, isShowAll, loading } = this.state;
    const { merchantName, address, industry } = getFieldsValue();
    return (
      <Form className={style.editForm}>
        <Loading loading={loading} />
        <FormItem className={style.logo}>
          {getFieldDecorator('logo', {
            rules: [
              {
                required: true,
                message: '请选择商户LOGO',
              },
            ],
          })(
            <Upload
              beforeUpload={this.beforeUpload}
              customRequest={this.customRequest}
              listType="picture"
              onRemove={this.handleRemove}
              accept="image/*"
            >
              <div className={style.uploadBtn}>
                <img src={img} alt="logo" className={style.img} />
                <div className={style.uploadModal}>
                  <span style={{ color: '#fff' }}>修改</span>
                </div>
              </div>
            </Upload>
          )}
        </FormItem>

        <FormItem>
          <div className={isNamewError ? style.errorFormItem : style.formItem}>
            <span className={style.mustDot} />
            <span style={{ paddingRight: 24 }}>商户名称</span>
            {getFieldDecorator('merchantName', {
              rules: [
                {
                  validator(rule, values, callback) {
                    if (values === '') {
                      self.setState({
                        isNamewError: true,
                      });
                      callback('必须填写');
                    } else {
                      self.setState({
                        isNamewError: false,
                      });
                      callback();
                    }
                  },
                },
              ],
              initialValue: '',
            })(
              <Input
                maxLength="20"
                placeholder="请填写您的商户名"
                style={{ width: 237 }}
              />
            )}
          </div>
        </FormItem>
        <FormItem>
          <div className={style.formItem}>
            <span className={style.mustDot} />
            <span style={{ paddingRight: 24 }}>商户地址</span>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '必须填写' }],
            })(
              <WeimobCascader
                options={newLocation}
                tabs={['省', '市', '区']}
                placeholder="请选择商户地址"
              />
            )}
          </div>
        </FormItem>
        <FormItem>
          <div className={style.formItem}>
            <span className={style.mustDot} />
            <span style={{ paddingRight: 24 }}>商户行业</span>
            {getFieldDecorator('industry', {
              rules: [{ required: true, message: '必须填写' }],
            })(
              <WeimobCascader
                options={convertToCascader(
                  industries,
                  keysMap,
                  'childIndustries'
                )}
                tabs={['一级行业', '二级行业']}
                placeholder="请选择商户行业"
              />
            )}
          </div>
        </FormItem>

        <div
          style={{ display: isShowAll ? 'none' : 'block', marginTop: 30 }}
          onClick={this.showAll}
        >
          <a>展开全部内容</a>
        </div>

        <div style={{ display: !isShowAll ? 'none' : 'block' }}>
          <FormItem>
            <div className={style.formItem}>
              <span style={{ paddingRight: 24 }}>商户简介</span>
              {getFieldDecorator('desc')(
                <Input maxLength="20" style={{ width: 237 }} />
              )}
            </div>
          </FormItem>
          <h2 className={style.yunyinTitle}>运营人信息</h2>
          <FormItem>
            <div className={style.formItem}>
              <span style={{ paddingRight: 48 }}>姓名</span>
              {getFieldDecorator('name')(
                <Input maxLength="20" style={{ width: 237 }} />
              )}
            </div>
          </FormItem>
          <FormItem>
            <div className={style.formItem}>
              <span style={{ paddingRight: 24 }}>手机号码</span>
              {getFieldDecorator('phone')(
                <Input maxLength="20" style={{ width: 237 }} />
              )}
            </div>
          </FormItem>
          <FormItem>
            <div className={style.formItem}>
              <span style={{ paddingRight: 40 }}>QQ号</span>
              {getFieldDecorator('qq')(<Input minLength="5" maxLength="11" />)}
            </div>
          </FormItem>
          <FormItem>
            <div className={style.formItem}>
              <span style={{ paddingRight: 36 }}>微信号</span>
              {getFieldDecorator('weixin')(
                <Input maxLength="20" style={{ width: 237 }} />
              )}
            </div>
          </FormItem>
          <FormItem>
            <div className={style.formItem} style={{ marginBottom: 80 }}>
              <span style={{ paddingRight: 48 }}>邮箱</span>
              {getFieldDecorator('mail')(
                <Input maxLength="20" style={{ width: 237 }} />
              )}
            </div>
          </FormItem>
        </div>

        {merchantName &&
        address &&
        industry &&
        address.every(item => item !== '') &&
        industry.every(item => item !== '') &&
        industry.length === 2 ? (
          <div className={style.modalFooter}>
            <a className={style.createShopBtn} onClick={this.handleSubmit}>
              <span>保存</span>
            </a>
          </div>
        ) : (
          <div className={style.modalFooter}>
            <a className={style.createShopBtn} style={{ opacity: 0.4 }}>
              <span>保存</span>
            </a>
          </div>
        )}
      </Form>
    );
  }
}
export default Form.create()(MerchantEdit);
