'use babel';

import React from 'react';
import {Card,Form,Input,Radio,DatePicker} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class BasicCard extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
        <div style={{ padding: '20px', width:'450px',height:'492px',float:'left'}}>
            <Card title="基本属性" bordered={false} style={{height:'452px'}}>
                <FormItem
                    {...formItemLayout}
                    label="编号"
                    required
                >
                {getFieldDecorator('ID')(
                    <Input placeholder="示例：FGW-XXX-X01" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="名称"
                    required
                >
                {getFieldDecorator('name')(
                    <Input placeholder="示例：京津冀交通优势度产品" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="级别"
                    required
                >
                {getFieldDecorator('level', { initialValue: 'inside' })(
                    <RadioGroup >
                        <Radio value="inside">内部</Radio>
                        <Radio value="outsides">外部</Radio>
                    </RadioGroup>
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="生产时间"
                    required
                >
                {getFieldDecorator('datetime')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Time" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="文件名"
                    required
                >
                {getFieldDecorator('fileName')(
                    <Input placeholder="示例：京津冀交通优势度.tif" />
                )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="坐标投影"
                    required
                >
                {getFieldDecorator('SRID', { initialValue: 'EPSG:4326' })(
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