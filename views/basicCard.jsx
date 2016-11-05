'use babel';

import React from 'react';
import {Card,Form,Input,Radio,DatePicker,Upload,Icon, Button} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class BasicCard extends React.Component {
  
  isEmpty(rule,value,callback){
      if (!value){
          callback();
      }
  }
  
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
        <div style={{ padding: '20px', width:'450px',height:'492px',float:'left'}}>
            <Card title="XXX1" bordered={false} style={{height:'452px'}}>
                <FormItem
                    {...formItemLayout}
                    label="XX"
                >
                {getFieldDecorator('theme',{
                    rules:[
                        {required:true,message:"不能为空"},
                    ],
                })(
                    <Input placeholder="" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="名称"
                >
                {getFieldDecorator('name',{
                    rules:[
                        {required:true,message:"名称不能为空"},
                    ],
                })(
                    <Input placeholder="示例：XXX" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="级别"
                >
                {getFieldDecorator('level',{
                    rules:[
                        {required:true,message:"级别不能为空"},
                    ],
                })(
                    <RadioGroup >
                        <Radio value="private">Private</Radio>
                        <Radio value="public">Public</Radio>
                    </RadioGroup>
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="时间"
                >
                {getFieldDecorator('datetime',{
                    rules:[
                        {required:true,type:'object',message:"时间不能为空"},
                    ],
                })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Time" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="文件名"
                >
                {getFieldDecorator('fileName',{
                    rules:[
                        {required:true,type:'object',message:"文件不能为空"},
                    ],
                })(
                    <Upload
                        className="avatar-uploader"
                        >
                        <Button type="ghost">
                            <Icon type="upload" /> 选择
                    </Button>
                    </Upload>
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="性别"
                    required
                >
                {getFieldDecorator('sex',{
                    rules:[
                        {required:true,message:"不能为空"},
                    ],
                })(
                    <RadioGroup>
                        <Radio value="male">male</Radio>
                        <Radio value="female">female</Radio>
                    </RadioGroup>
                )}
                </FormItem>

            </Card>
        </div>
    );
  }
}