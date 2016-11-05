'use babel';

import React from 'react';
import {Form, Button, Popconfirm, message} from 'antd';
import BasicCard from './basicCard.jsx'
import ExtendCard from './extendCard.jsx'

const ipcRenderer = require('electron').ipcRenderer;

const FormItem = Form.Item;

let Demo = React.createClass({
  
  getInitialState(){
    return ({
      'theme':'',
      'level':'',
      'SRID':'',
      'department':'',
      'contact':'',
      'phone':'',
    });
  },

  componentDidMount(){
    ipcRenderer.sendSync('getConfig');
    ipcRenderer.on('returnConfig', function (event, arg) {
        if(arg!="notFound"){
          message.success('自动填充上次配置');
          this.setState({
            'theme':arg.theme,
            'level':arg.level,
            'SRID':arg.SRID,
            'department':arg.department,
            'contact':arg.contact,
            'phone':arg.phone,
          });
        }
      }.bind(this));
  },


  handleSubmit(e) {
    var fieldsValues= this.props.form.getFieldsValue();
    e.preventDefault();
    console.log('Received values of form:', fieldsValues);
    this.props.form.validateFields((errors,values)=>{
      if(errors){
        console.log('Errors in form!!!');
        return;
      }

      ipcRenderer.sendSync('synchronous-message', fieldsValues);
      ipcRenderer.on('asynchronous-reply', function (event, arg) {
        console.log(arg);
        message.success('文件已生成');
      });

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
            <BasicCard {...this.props} config={this.state}/>
            <ExtendCard {...this.props} config={this.state}/>
          </div>
          <FormItem style={{float:'right',marginRight:'40px',marginTop:'20px'}}>
            <Button type="primary" htmlType="submit" size="large"  style={{ marginRight: 8 }}>生成</Button>
            <Popconfirm title="确定要重置?" onConfirm={this.confirm} okText="确定" cancelText="取消">
              <Button onClick={this.handleReset} size="large">清除</Button>
            </Popconfirm>
          </FormItem>
        </Form>
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
