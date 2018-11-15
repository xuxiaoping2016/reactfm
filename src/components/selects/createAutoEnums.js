import React from 'react';
import merge from 'lodash/merge';

export default function createAutoEnums(enumsMap) {
  return function AutoEnums(config) {
    config = merge(
      {
        nameSpace: 'enums',
        mapEnums: () => {},
        enums: [],
        forceEnums: [],
      },
      config
    );
    return function(WrappedComponent) {
      class AutoEnumsHOC extends React.Component {
        state = {
          loading: false,
          err: null,
        };

        componentDidMount() {
          const requestFns = config.enums.reduce((acc, key) => {
            const enumsModel = enumsMap[key];
            const enumsRequest = enumsModel && enumsModel.fetchData;
            if (typeof enumsRequest === 'function') {
              if (config.forceEnums.includes(key)) {
                acc.push(enumsRequest());
              } else if (enumsModel.data.length === 0) {
                acc.push(enumsRequest());
              }
            } else {
              const message = `AutoEnums传入的数组的key必须在“${Object.keys(
                enumsMap
              ).join('、')}”里面`;
              throw new Error(message);
            }
            return acc;
          }, []);
          if (requestFns.length === 0) {
            return;
          }
          this.setState({ loading: true });
          Promise.all(requestFns)
            .then(() => {
              this.setState({ loading: false });
            })
            .catch(err => {
              this.setState({ loading: false, err });
            });
        }

        render() {
          const enumsProps = config.mapEnums(enumsMap);
          const props = {
            [config.nameSpace]: {
              ...this.state,
              ...enumsProps,
            },
            ...this.props,
          };
          return <WrappedComponent {...props} />;
        }
      }
      return AutoEnumsHOC;
    };
  };
}
