import React from 'react';
import PropsTypes from 'prop-types';
import { Form, InputNumber, Input } from 'antd';
import TableContext from './tableContext';

const { Fragment } = React;
const FormItem = Form.Item;
const EditableContext = React.createContext();

/* eslint-disable react/prop-types */
const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getMoneyInput = (record, indexOfRecord, onInputChange = () => {}) => (
    <InputNumber
      min={0.0}
      precision={2}
      max={99999999.99}
      formatter={value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/￥\s?|(,*)/g, '')}
      style={{ width: 80 }}
      onChange={value => onInputChange(value, indexOfRecord)}
    />
  );

  getFloatInput = (record, indexOfRecord, onInputChange = () => {}) => (
    <InputNumber
      min={0.0}
      precision={2}
      max={99999999.99}
      style={{ width: 80 }}
      onChange={value => onInputChange(value, indexOfRecord)}
    />
  );

  getIntInput = (record, indexOfRecord, onInputChange = () => {}) => (
    <InputNumber
      step={1}
      precision={0}
      style={{ width: '100%' }}
      onChange={value => onInputChange(value, indexOfRecord)}
    />
  );

  getStringInput = (record, indexOfRecord, onInputChange = () => {}) => (
    <Input
      style={{ width: '100%' }}
      onChange={value => onInputChange(value, indexOfRecord)}
    />
  );

  getInput(record, indexOfRecord, onInputChange = () => {}, input = 'money') {
    if (input === 'money') {
      return this.getMoneyInput(record, indexOfRecord, onInputChange);
    }
    if (input === 'int') {
      return this.getIntInput(record, indexOfRecord, onInputChange);
    }
    if (input === 'string') {
      return this.getStringInput(record, indexOfRecord, onInputChange);
    }
    return this.getFloatInput(record, indexOfRecord, onInputChange);
  }

  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      isFormWrapped,
      dataSource = [],
      rowKey,
      onInputChange,
      input,
      required = false,
      rules,
      ...restProps
    } = this.props;

    const indexOfRecord = dataSource.findIndex(
      p => p[rowKey] === record[rowKey]
    );
    const HtmlTag = isFormWrapped
      ? TableContext.Consumer
      : EditableContext.Consumer;

    return (
      <Fragment>
        <HtmlTag>
          {form => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(
                      isFormWrapped
                        ? `${dataIndex}[${indexOfRecord}]`
                        : dataIndex,
                      {
                        rules: [
                          {
                            required,
                            message: `请补充完整${title}!`,
                          },
                        ].concat(
                          Array.isArray(rules)
                            ? rules
                            : rules instanceof Function
                            ? rules(form, indexOfRecord, record)
                            : []
                        ),
                        initialValue:
                          input === 'float'
                            ? record[dataIndex] || 0
                            : record[dataIndex] || '',
                      }
                    )(
                      this.getInput(record, indexOfRecord, onInputChange, input)
                    )}
                  </FormItem>
                ) : (
                  restProps.children
                )}
              </td>
            );
          }}
        </HtmlTag>
      </Fragment>
    );
  }
}

export { EditableFormRow, EditableCell, EditableContext };

EditableCell.propsTypes = {
  form: PropsTypes.shape({}).isRequired,
};
