import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { Pager } from 'components/hoc';
import { GoodsCategoryCascader } from 'components/uiKits/selects';
import Pagination from 'components/pagination';
import DetailTable from 'components/detailTable';
import PageContentLayout from 'components/layout/pageContent';
import EditModal from './skuEditModal';
import { fetchStockList } from '../services';
import styles from '../styles/index.module.less';

const { Search } = Input;
@Pager({
  nameSpace: 'stocksPager',
  onRequest: fetchStockList,
  pagination: { pageSize: 10, page: 1 },
  format: {
    beforeRequest(query) {
      const { categoryCode, ...finalQuery } = query;
      if (Array.isArray(categoryCode)) {
        finalQuery.categoryCode = categoryCode[categoryCode.length - 1];
      }
      return finalQuery;
    },
    afterResponse(response) {
      const { data } = response;
      data.list.forEach(item => {
        item.skuList.forEach(i => {
          i.categoryName = item.categoryName;
          i.name = item.goodsName;
        });
      });
      return data;
    },
  },
})
export default class List extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldProps: PropTypes.func.isRequired,
    }).isRequired,
    stocksPager: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      submit: PropTypes.func.isRequired,
      loadData: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    visible: false,
    selecedIndex: -1,
  };

  closeModal = shouldReload => {
    // 重刷页面
    if (shouldReload === true) {
      const { stocksPager } = this.props;
      stocksPager.reload();
    }
    this.setState({ visible: false });
  };

  toEditItem = index => {
    this.setState({ selecedIndex: index, visible: true });
  };

  renderFeilds() {
    const {
      form: { getFieldProps },
      stocksPager: { submit, reset, loadData },
    } = this.props;
    return (
      <div className={styles.form}>
        <GoodsCategoryCascader
          {...getFieldProps('categoryCode', {
            getValueFromEvent: value => {
              loadData({
                page: 1,
                categoryCode: value,
              });
              return value;
            },
          })}
          style={{ width: 160 }}
          placeholder="商品类目"
        />
        <div className={styles.formLeft}>
          <Search
            {...getFieldProps('keyword')}
            style={{ width: 210 }}
            onSearch={submit}
            placeholder="SPUID/商品名称"
            enterButton="搜索"
          />
          <Button className="retButton" onClick={reset}>
            重置
          </Button>
        </div>
      </div>
    );
  }

  renderPagination() {
    const {
      stocksPager: { pagination },
    } = this.props;
    if (pagination.total <= 0) {
      return null;
    }
    return (
      <div className={styles.pagination}>
        <Pagination {...pagination} />
      </div>
    );
  }

  render() {
    const {
      stocksPager: { data, loading },
    } = this.props;
    const { selecedIndex, visible } = this.state;

    const spuStockColumns = [
      {
        title: 'SPUID',
        dataIndex: 'supplierGoodsId',
        key: 'supplierGoodsId',
        width: 125,
      },
      {
        title: '商品类目',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 160,
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
        width: 220,
      },
      {
        title: '总库存',
        dataIndex: 'stockNum',
        key: 'stockNum',
        width: 125,
        sorter: (a, b) => a.stockNum - b.stockNum,
      },
      {
        title: '冻结库存',
        dataIndex: 'usedStock',
        key: 'usedStock',
        width: 125,
        sorter: (a, b) => a.usedStock - b.usedStock,
      },
      {
        title: '可用库存',
        dataIndex: 'availableStock',
        key: 'availableStock',
        width: 125,
        sorter: (a, b) => a.availableStock - b.availableStock,
      },
      {
        title: '订单占用库存',
        dataIndex: 'orderUsedStock',
        key: 'orderUsedStock',
        width: 160,
        sorter: (a, b) => a.orderUsedStock - b.orderUsedStock,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 125,
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text, row, index) => (
          <a onClick={() => this.toEditItem(index)} href="javascript:;">
            编辑库存
          </a>
        ),
      },
    ];

    return (
      <React.Fragment>
        <PageContentLayout
          titles={['库存列表']}
          footer={this.renderPagination()}
        >
          <React.Fragment>
            {this.renderFeilds()}
            <div className={styles.table}>
              <DetailTable
                size="large"
                type="strip"
                scroll={{ x: 1000 }}
                rowKey="supplierGoodsId"
                isLoading={loading}
                dataSource={data}
                title={spuStockColumns}
              />
            </div>
          </React.Fragment>
        </PageContentLayout>
        <EditModal
          data={data[selecedIndex]}
          onCancel={this.closeModal}
          visible={visible}
        />
      </React.Fragment>
    );
  }
}
