import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Form, message } from 'antd';
import Modal from 'components/uiKits/modal';
import DetailTable from 'components/detailTable';
import { updateSkuStock } from '../services';
import styles from '../styles/index.module.less';

const FormItem = Form.Item;

const inputFormater = value => {
  const val = `${value}`;
  if (val && /\d/.test(val[0])) {
    return `+${value}`;
  }
  return value;
};

@Form.create()
export default class EditModal extends React.Component {
  static defaultProps = {
    data: {},
  };

  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      setFields: PropTypes.func.isRequired,
      getFieldError: PropTypes.func.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
  };

  state = {
    confirmLoading: false,
  };

  onFeildFocus(skuId) {
    const {
      form: { getFieldError, setFields },
    } = this.props;
    if (getFieldError(skuId)) {
      setFields({ [skuId]: { errors: null } });
    }
  }

  onSubmit = e => {
    const { form, data, onCancel } = this.props;
    e.preventDefault();
    this.setState({ confirmLoading: true });
    form.validateFields(async (err, values) => {
      if (err) {
        this.setState({ confirmLoading: false });
        return;
      }
      const skuInfos = Object.keys(values).reduce((acc, key) => {
        const stock = values[key];
        if (typeof stock === 'number') {
          acc.push({ skuId: Number(key), stock: values[key] });
        }
        return acc;
      }, []);
      if (skuInfos.length === 0) {
        this.setState({ confirmLoading: false });
        message.info('请编辑“增加/减少库存”');
        return;
      }
      const response = await updateSkuStock({
        skuInfos,
        supplierGoodsId: data.supplierGoodsId,
      });
      this.setState({ confirmLoading: false });
      // 更新成功
      if (response.data && response.data.status) {
        message.success('修改库存成功');
        onCancel(true);
        return;
      }
      message.error('修改库存失败');
      const updatedFeilds = response.data.stockUpdateErrors.reduce(
        (acc, { skuId, stockNum }) => {
          acc[skuId] = {
            errors: [new Error(`减少库存需小于${stockNum}件`)],
          };
          return acc;
        },
        {}
      );
      form.setFields(updatedFeilds);
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      data,
      onCancel,
      visible,
    } = this.props;
    const { confirmLoading } = this.state;
    const skuStockColumns = [
      {
        title: '商品类目',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 100,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 140,
      },
      {
        title: 'SKU规格',
        dataIndex: 'skuAttrInfo',
        key: 'skuAttrInfo',
        width: 200,
      },
      {
        title: '可用库存',
        dataIndex: 'availableStock',
        key: 'availableStock',
        width: 100,
      },
      {
        title: '增加/减少库存',
        key: 'action',
        width: 140,
        render: ({ skuId }) => (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(String(skuId))(
              <InputNumber
                onFocus={() => this.onFeildFocus(skuId)}
                formatter={inputFormater}
              />
            )}
          </FormItem>
        ),
      },
    ];
    return (
      <Modal
        className={styles.editModal}
        title="编辑库存"
        okText="保存"
        cancelText="取消"
        centered
        width={812}
        destroyOnClose
        bodyStyle={{
          maxHeight: 460,
          minHeight: 100,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={this.onSubmit}
        visible={visible}
      >
        <DetailTable
          type="pure"
          rowKey="skuId"
          pagination={false}
          title={skuStockColumns}
          dataSource={data ? data.skuList || [] : []}
        />
      </Modal>
    );
  }
}
