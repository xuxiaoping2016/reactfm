import React from 'react';
import { Form } from 'antd';
import { isNil } from 'lodash';
import { convertDataToForm } from '../../utils/helper';

const CreateFactory = ({
  getAction,
  putAction,
  postAction,
  mapPropsToFields = p => p,
}) => Component => {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      const {
        match: {
          params: { id },
        },
      } = this.props;
      this.state = { isUpdate: !isNil(id), data: {} };
    }

    async componentDidMount() {
      const { isUpdate } = this.state;
      const {
        match: {
          params: { id },
        },
        form: { setFields },
      } = this.props;
      if (isUpdate) {
        this.setState({ isLoading: true });

        const { data = {} } = await getAction(id);
        if (data) {
          const fields = mapPropsToFields(data);
          setFields(convertDataToForm(fields));
        }
        this.setState({ isLoading: false, data });
      }
    }

    onSubmit = async (values, callback) => {
      this.setState({ isLoading: true });
      const { isUpdate } = this.state;
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const response = isUpdate
        ? await putAction(id, values)
        : await postAction(values);
      this.setState({ isLoading: false });
      if (response && callback) {
        callback();
      }
      return response;
    };

    render() {
      const definedProps = {
        ...this.props,
        ...this.state,
        onSubmit: this.onSubmit,
      };

      return <Component {...definedProps} />;
    }
  }
  return Form.create()(WrapperComponent);
};

export default CreateFactory;
