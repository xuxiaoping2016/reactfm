import React from 'react';
import PropTypes from 'prop-types';
import Tinymce from 'uxcore-tinymce';
import { debounce } from 'lodash';
import { getPid } from 'utils/env';
import style from './index.module.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value && this.props.value == undefined) {
      this.editor && this.editor.resetValue(nextProps.value);
    }
  }

  getLen(html) {
    return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').length;
  }

  init(e, editor) {
    const len = this.getLen(this.props.value || '');
    this.setState({
      words: len,
    });
  }

  handleChange = (e, editor) => {
    const { onChange } = this.props;
    onChange(editor.getContent());
  };

  onKeyup = (e, editor) => {
    this.setState({ words: this.getLen(editor.getContent()) });
  };

  render() {
    const { words } = this.state;
    const basicConfigs = {
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime table contextmenu paste code',
        'colorpicker',
        'placeholder',
        'variable',
        'noneditable',
        'upload',
        'wordcount',
      ],
      toolbar1:
        'preview undo redo | fontselect fontsizeselect | bold italic underline strikethrough removeformat | forecolor backcolor | link | emoticons upload',
      external_plugins: {
        upload: '/plugins/upload.js',
        emoticons:
          'https://g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/emoticons/plugin.min.js',
        textcolor:
          'https://g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/textcolor/plugin.min.js',
        hr:
          'https://g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/hr/plugin.min.js',
        placeholder:
          'https://g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/placeholder/plugin.min.js',
        variable:
          'https://g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/variable/plugin.min.js',
      },
      uploadConfig: {
        inputName: 'multipartFile',
        actionUrl: `/api3/foundation/wxbiz/core/upload?type=1&pid=${getPid()}`,
        formatResult(response) {
          return {
            content: {
              name: response.data.name,
              downloarUrl: response.data.url,
            },
          };
        },
        errorCallback(...rest) {
          console.error('errorCallback', rest);
        },
        progressCallback(...rest) {
          console.error('progressCallback', rest);
        },
      },
      videoConfig: {
        inputName: 'multipartFile',
        actionUrl: `/api3/foundation/wxbiz/core/upload?type=3&pid=${getPid()}`,
        formatResult(response) {
          return {
            content: {
              name: response.data.name,
              downloarUrl: response.data.url,
            },
          };
        },
      },
      max_chars: 500,
      branding: false,
      elementpath: false,
      statusbar: false,
    };
    return (
      <div className={style.editor}>
        <Tinymce
          config={basicConfigs}
          ref={ref => {
            this.editor = ref;
          }}
          content={this.props.value}
          onChange={this.handleChange}
          onLoadContent={this.init.bind(this)}
          onKeyup={debounce(this.onKeyup, 300)}
        />
        <div className={style.counter}>
          {words}
          /500
        </div>
      </div>
    );
  }
}

export default Editor;

Editor.propTypes = {
  value: PropTypes.string, // eslint-disable-line
  initValue: PropTypes.string, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};
