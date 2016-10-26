'use babel';

import React from 'react';
import {Form, Button, Popconfirm, message} from 'antd';
import BasicCard from './basicCard.jsx'
import ExtendCard from './extendCard.jsx'

const ipcRenderer = require('electron').ipcRenderer;

const FormItem = Form.Item;

let Demo = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form.getFieldsValue().datetime.toDate());
    console.log('Received values of form:', this.props.form.getFieldsValue());
    ipcRenderer.sendSync('synchronous-message', this.props.form.getFieldsValue());
    ipcRenderer.on('asynchronous-reply', function (event, arg) {
      console.log(arg);
      message.success('文件已生成');
    });
  },

  handleReset(e) {
    e.preventDefault();
  },
  confirm() {
    this.props.form.resetFields();
  },

  render() {
    
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <div className="clearfix">
            <BasicCard {...this.props}/>
            <ExtendCard {...this.props}/>
          </div>
          <FormItem style={{float:'right',marginRight:'40px',marginTop:'20px'}}>
            <Button type="primary" htmlType="submit" size="large"  style={{ marginRight: 8 }}>生成</Button>
            <Popconfirm title="确定要重置?" onConfirm={this.confirm} okText="确定" cancelText="取消">
              <Button onClick={this.handleReset} size="large">清除</Button>
            </Popconfirm>
          </FormItem>
        </Form>
        <div style={{float:'left',marginLeft:'20px',marginTop:'70px'}}>
          &copy;copyright 中国科学院电子学研究所苏州研究院
        </div>
      </div>
    );
  },
});

Demo = Form.create()(Demo);

export default class Main extends React.Component {
  render() {
    return <Demo />;
  }
}
