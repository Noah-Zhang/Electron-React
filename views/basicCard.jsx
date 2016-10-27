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
            <Card title="基本属性" bordered={false} style={{height:'452px'}}>
                <FormItem
                    {...formItemLayout}
                    label="专题名"
                >
                {getFieldDecorator('theme',{
                    rules:[
                        {required:true,message:"专题名不能为空"},
                    ],
                })(
                    <Input placeholder="示例：XXX专题" />
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
                    <Input placeholder="示例：京津冀交通优势度产品" />
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
                        <Radio value="private">内部</Radio>
                        <Radio value="public">公开</Radio>
                    </RadioGroup>
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="生产时间"
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
                    label="影像文件名"
                >
                {getFieldDecorator('fileName',{
                    rules:[
                        {required:true,type:'object',message:"影像文件不能为空"},
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
                    label="坐标投影"
                    required
                >
                {getFieldDecorator('SRID',{
                    rules:[
                        {required:true,message:"投影坐标不能为空"},
                    ],
                })(
                    <RadioGroup>
                        <Radio value="EPSG:4326">EPSG:4326</Radio>
                        <Radio value="EPSG:900913">EPSG:900913</Radio>
                    </RadioGroup>
                )}
                </FormItem>

            </Card>
        </div>
    );
  }
}