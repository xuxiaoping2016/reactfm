import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './index.less';

export default class InfoCard extends React.Component {
  static propTypes = {
    span: PropTypes.number,
    data: PropTypes.shape({}),
    columns: PropTypes.shape([]),
  };

  static defaultProps = {
    span: 10,
    data: {
      agentName: '万能WIFI钥匙',
      buyerRemark: '',
      deliveryTime: '2018-11-12 14:16:04',
      finishType: 4,
      orderNo: 1104600000331446,
      orderSn: '52121842239803392',
      orderStatus: 5,
      orderStatusTips: '系统自动收货，交易完成',
      payBillNo: '1104600000323246',
      payBillSn: '409820181112000000000035',
      payType: 1,
      receiverAddress: '测试地址测试',
      receiverArea: 310113,
      receiverAreaStr: '',
      receiverCity: 310100,
      receiverCityStr: '上海市',
      receiverName: '周妍妍',
      receiverPhone: '13661466565',
      receiverProvince: 310000,
      receiverProvinceStr: '上海',
      refundNo: 1104600000150946,
      refundReason: '不喜欢',
      refundSn: '52122180703358976',
      refundStatus: 1,
      refundType: 0,
      supplierName:
        '8533分销测试232测试数据8533分销测试232测试数据8533分销测试232测试数据8533分销测试232测试数据',
    },
    columns: [
      {
        title: '标题',
        maps: [
          {
            label: '订单编号',
            key: 'orderNo',
            render: (key, data) => {
              console.log(key, data);
              return data[key];
            },
          },
          {
            label: '订单来源',
            key: 'agentName',
            render: (key, data) => data[key],
          },
        ],
      },
      {
        maps: [
          {
            label: '订单编号',
            key: 'orderNo',
            render: (key, data) => data[key],
          },
          {
            label: '订单来源',
            key: 'agentName',
            render: (key, data) => data[key],
          },
        ],
      },
    ],
  };

  render() {
    const { span, data, columns } = this.props;
    return (
      <Row className="info-card-container">
        {columns.map((item, index) => (
          <Col span={span} push={index !== 0 ? 12 - span : 0} key={index}>
            <div className="info-card-header">{item.title}</div>
            <ul className="info-card-body">
              {item.maps.map((cur, subIndex) => (
                <li className="info-card-item" key={subIndex}>
                  <span className="info-card-label">{cur.label}：</span>
                  <span className="info-card-val">
                    {cur.render
                      ? cur.render(data[cur.key], data)
                      : data[cur.key]}
                  </span>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    );
  }
}
