import React from 'react';
import PropsTypes from 'prop-types';
import { Table, Form } from 'antd';
import Ellipsis from 'components/uiKits/ellipsis';
import { EditableFormRow, EditableCell, EditableContext } from './editableCell';
import TableContext from './tableContext';
import style from './index.module.less';

const { Column } = Table;
const injectContext = func => (
  <EditableContext.Consumer>{form => func(form)}</EditableContext.Consumer>
);

@Form.create()
class DetailTable extends React.Component {
  handleSelect = (record, selected) => {
    const { onSelect } = this.props;
    onSelect(record, selected);
  };

  handleSelectAll = (selected, selectedRows) => {
    const { onSelectAll } = this.props;
    onSelectAll(selected, selectedRows);
  };

  onChange = (pagination, filters, sorter) => {
    const { onSorterChange } = this.props;
    onSorterChange(sorter.order);
  };

  render() {
    const {
      title,
      dataSource,
      selectedRowKeys,
      rowKey,
      checkable,
      scroll,
      size,
      action,
      isLoading,
      disabledKey,
      emptyText,
      form,
      type,
      isFormWrapped,
      bordered,
    } = this.props;
    const items = title.map((item, index) => {
      const render = (text, record, idx) => {
        if (item.render) {
          return item.render(text, record, idx, form);
        }
        if (item.popover) {
          return (
            <Ellipsis length={35} tooltip>
              {text}
            </Ellipsis>
          );
        }
        return <span>{text}</span>;
      };
      if (item.editable) {
        return (
          <Column
            {...item}
            title={item.title}
            render={render}
            onCell={record => ({
              record,
              isFormWrapped,
              inputtype: 'text',
              rowKey,
              dataSource,
              dataIndex: item.dataIndex,
              title: item.subTitle,
              editing: true,
              onInputChange: item.onInputChange,
              input: item.input,
              required: item.required,
              rules: item.rules,
            })}
          />
        );
      }
      return (
        <Column {...item} key={index} render={render} title={item.title} />
      );
    });

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const rowSelection = {
      onSelect: this.handleSelect,
      selectedRowKeys,
      onSelectAll: this.handleSelectAll,
      getCheckboxProps: record => ({
        disabled: disabledKey ? record[disabledKey] : false,
      }),
    };

    return (
      <div className={style[`ui-${type}-table`]}>
        <TableContext.Provider value={form}>
          <Table
            className={style.table}
            components={components}
            loading={isLoading}
            size={size}
            scroll={scroll}
            rowKey={rowKey}
            bordered={bordered}
            dataSource={dataSource}
            locale={{ emptyText: emptyText || '暂无数据' }}
            rowSelection={checkable ? rowSelection : null}
            pagination={false}
            onChange={this.onChange}
          >
            {items}
            {action ? action() : null}
          </Table>
        </TableContext.Provider>
      </div>
    );
  }
}

export default DetailTable;

DetailTable.propsTypes = {
  emptyText: PropsTypes.oneOfType([PropsTypes.shape({}), PropsTypes.element]),
  scroll: PropsTypes.shape({}),
  onFilter: PropsTypes.func.isRequired,
  title: PropsTypes.shape([]).isRequired,
  dataSource: PropsTypes.shape([]).isRequired,
  selectedRowKeys: PropsTypes.shape([]),
  rowKey: PropsTypes.string,
  pageSize: PropsTypes.number,
  current: PropsTypes.number,
  total: PropsTypes.number,
  size: PropsTypes.string,
  action: PropsTypes.oneOfType([PropsTypes.func, PropsTypes.object]),
  isLoading: PropsTypes.bool,
  checkable: PropsTypes.bool,
  disabledKey: PropsTypes.string,
  bordered: PropsTypes.bool,
  onSorterChange: PropsTypes.func,
  type: PropsTypes.oneOf(['', 'strip', 'pure']),
};

DetailTable.defaultProps = {
  selectedRowKeys: [],
  rowKey: 'id',
  pageSize: 10,
  current: 1,
  total: 0,
  size: 'default',
  action: null,
  isLoading: false,
  checkable: false,
  disabledKey: '',
  emptyText: null,
  bordered: false,
  scroll: {},
  onSorterChange: () => {},
  type: '',
};
