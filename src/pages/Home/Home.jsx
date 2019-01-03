import React, { Component } from 'react';
import {request} from 'utils/request'
import GoodsList from 'cspackage'

const data = [
    {
        "buttonType": 0,
        "buyer": "123456816",
        "createTime": "2018-09-24 15:22:16",
        "goodsList": {
            "agentPrice": 0.01,
            "goodsId": 2019,
            "goodsImage": "https://image-c.weimobwmc.com/jingxuan-file/c951af996dd5476485540e903d5fa05d.jpg?mdw=800&mdh=800",
            "goodsName": "导出5000条数据测试无用数据【美丽更加倍】万味生柠檬荷叶茶160g/袋",
            "payPrice": 0.01,
            "quantity": 1,
            "salePrice": 74.00,
            "sku": "160g/袋装",
            "skuId": 34008,
            "supplierGoodsId": 2018,
            "supplierPrice": 0.01
        },
        "orderNo": 99993,
        "orderSn": "99993",
        "orderStatus": 2,
        "payAmount": 0.01,
        "receiverName": "杨阳",
        "refundBalance": 0.01,
        "refundNo": 99993,
        "refundSn": "99993",
        "refundStatus": 6,
        "refundType": 0
    },
    {
        "buttonType": 0,
        "buyer": "123456816",
        "createTime": "2018-09-24 15:22:16",
        "goodsList": {
            "agentPrice": 0.01,
            "goodsId": 2019,
            "goodsImage": "https://image-c.weimobwmc.com/jingxuan-file/c951af996dd5476485540e903d5fa05d.jpg?mdw=800&mdh=800",
            "goodsName": "导出5000条数据测试无用数据【美丽更加倍】万味生柠檬荷叶茶160g/袋",
            "payPrice": 0.01,
            "quantity": 1,
            "salePrice": 74.00,
            "sku": "160g/袋装",
            "skuId": 34008,
            "supplierGoodsId": 2018,
            "supplierPrice": 0.01
        },
        "orderNo": 99985,
        "orderSn": "99985",
        "orderStatus": 2,
        "payAmount": 0.01,
        "receiverName": "杨阳",
        "refundBalance": 0.01,
        "refundNo": 99985,
        "refundSn": "99985",
        "refundStatus": 6,
        "refundType": 0
    },
    {
        "buttonType": 0,
        "buyer": "123456816",
        "createTime": "2018-09-24 15:22:16",
        "goodsList": {
            "agentPrice": 0.01,
            "goodsId": 2019,
            "goodsImage": "https://image-c.weimobwmc.com/jingxuan-file/c951af996dd5476485540e903d5fa05d.jpg?mdw=800&mdh=800",
            "goodsName": "导出5000条数据测试无用数据【美丽更加倍】万味生柠檬荷叶茶160g/袋",
            "payPrice": 0.01,
            "quantity": 1,
            "salePrice": 74.00,
            "sku": "160g/袋装",
            "skuId": 34008,
            "supplierGoodsId": 2018,
            "supplierPrice": 0.01
        },
        "orderNo": 99996,
        "orderSn": "99996",
        "orderStatus": 2,
        "payAmount": 0.01,
        "receiverName": "杨阳",
        "refundBalance": 0.01,
        "refundNo": 99996,
        "refundSn": "99996",
        "refundStatus": 6,
        "refundType": 0
    },
    {
        "buttonType": 0,
        "buyer": "123456816",
        "createTime": "2018-09-24 15:22:16",
        "goodsList": {
            "agentPrice": 0.01,
            "goodsId": 2019,
            "goodsImage": "https://image-c.weimobwmc.com/jingxuan-file/c951af996dd5476485540e903d5fa05d.jpg?mdw=800&mdh=800",
            "goodsName": "导出5000条数据测试无用数据【美丽更加倍】万味生柠檬荷叶茶160g/袋",
            "payPrice": 0.01,
            "quantity": 1,
            "salePrice": 74.00,
            "sku": "160g/袋装",
            "skuId": 34008,
            "supplierGoodsId": 2018,
            "supplierPrice": 0.01
        },
        "orderNo": 99988,
        "orderSn": "99988",
        "orderStatus": 2,
        "payAmount": 0.01,
        "receiverName": "杨阳",
        "refundBalance": 0.01,
        "refundNo": 99988,
        "refundSn": "99988",
        "refundStatus": 6,
        "refundType": 0
    },
    {
        "buttonType": 0,
        "buyer": "123456816",
        "createTime": "2018-09-24 15:22:16",
        "goodsList": {
            "agentPrice": 0.01,
            "goodsId": 2019,
            "goodsImage": "https://image-c.weimobwmc.com/jingxuan-file/c951af996dd5476485540e903d5fa05d.jpg?mdw=800&mdh=800",
            "goodsName": "导出5000条数据测试无用数据【美丽更加倍】万味生柠檬荷叶茶160g/袋",
            "payPrice": 0.01,
            "quantity": 1,
            "salePrice": 74.00,
            "sku": "160g/袋装",
            "skuId": 34008,
            "supplierGoodsId": 2018,
            "supplierPrice": 0.01
        },
        "orderNo": 99999,
        "orderSn": "99999",
        "orderStatus": 2,
        "payAmount": 0.01,
        "receiverName": "杨阳",
        "refundBalance": 0.01,
        "refundNo": 99999,
        "refundSn": "99999",
        "refundStatus": 6,
        "refundType": 0
    },
    ]

const column = [{
    title: '商品信息',
    key: 'goodsList',
    render: goodsList => <div>{goodsList.goodsName}</div>
  },
  {
    title: '实付货款',
    key: 'payAmount',
    render: text => `￥${text}`,
  },
  {
    title: '客户信息',
    key: 'receiverName',
    render: text => text,
  },
  {
    title: '退款金额',
    key: 'refundBalance',
    render: text => `￥${text}`,
  },
  {
    title: '订单号',
    key: 'orderSn'
  },
];
console.log(GoodsList)
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        if (this.state.count == 1) {
            console.log("...")
        }
    }

    handleClick = () => {
        this.setState({
            count: ++this.state.count
        });
    }
    render() {
        return (
            <div>
                this is home~558888888888888888888<br />
                当前计数：{this.state.count}<br />
                <button onClick={this.handleClick}>自增</button>
                {/* <GoodsList 
                    list={data}
                    column={column}
                /> */}
            </div>
        )
    }
}