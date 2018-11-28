import React, { Component } from "react";

import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import { list } from './data'



  
  

export default class NestingTable extends Component {

  getColumn = () => [
    {
      title: '商品信息',
      width: 2,
      dataIndex: 'orderGoodsList',
      key: 'orderGoodsList',
      align: 'center',
      className: styles.good,
      render: (goodsList, row) => {
        const len = goodsList.length;
        return goodsList.map(goods => (
          <div
            className={`${styles.goosInfo} ${styles.bdr}`}
            key={goods.goodsId}
          >
            <img
              className={styles.goodsImg}
              src={goods.goodsImage}
              alt="商品图片"
            />
            <div className={styles.info}>
              <div className={styles.goodsName}>{goods.goodsName}</div>
              <div>
                数量：×
                {goods.quantity} &nbsp;&nbsp; {goods.sku}
              </div>
              <div>
                单价：￥
                {goods.supplierPrice}
              </div>
              <div>
                spuid：
                {goods.goodsId}
              </div>
            </div>
          </div>
        ));
      },
    },
    {
      width: 1,
      title: '实收款',
      dataIndex: 'payAmount',
      key: 'payAmount',
      align: 'center',
      render: val => `￥${val}`,
    },
    {
      width: 1,
      title: '客户信息',
      align: 'center',
      key: 'receiverName',
      dataIndex: 'receiverName',
      render: val => val,
    },
    {
      width: 1,
      title: '支付方式',
      align: 'center',
      key: 'payType',
      dataIndex: 'payType',
      render: text => payTypeMap[text],
    },
    {
      width: 1,
      title: '维权状态',
      align: 'center',
      key: 'orderGoodsList',
      dataIndex: 'orderGoodsList',
      render: (orderGoodsList, record) =>
        // -1 是无维权
        orderGoodsList.map((item, index) => {
          const text = item.refundStatus;
          return text == -1 ? (
            perStateMap[text]
          ) : (
            <a
              key={index}
              href="javascript:;"
              onClick={this.goPermissionDetail.bind(this, record)}
            >
              {perStateMap[text]}
            </a>
          );
        }),
    },
    {
      width: 1,
      title: '订单状态',
      align: 'center',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: this.renderOrderStatus,
    },
  ];

  render(){

      return (
        <div>fdfd</div>
          // <Table
          //   className="components-table-demo-nested"
          //   columns={columns}
          //   expandedRowRender={this.expandedRowRender}
          //   dataSource={data}
          // />
      );
  }
}
