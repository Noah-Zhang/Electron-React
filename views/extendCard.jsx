import React from 'react';
import { Card,Form,Input,Select,Upload, Icon,Button} from 'antd';

const FormItem = Form.Item;

export default class ExtendCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnailFileList:[],

            thumbnailPath:'',

        };

    }

    handleThumbnailChange(info){
        console.log(info);
        var thumbnailFileList = info.fileList.slice(-1);
        var thumbnailPath = info.file.name;
        this.setState({ thumbnailFileList, thumbnailPath });
        console.log(this.state);
    }


    
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        };

        const Option = Select.Option;
        const imageUrl = this.state.imageUrl;

        
        return (
            <div style={{ padding: '20px', width:'450px' ,float:'left' }}>
                <Card title="扩展描述" bordered={false} >
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                        required
                    >
                    {getFieldDecorator('department')(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="选择部门"
                            notFoundContent=""
                        >
                            <Option value="jack">发改委</Option>
                            <Option value="lucy">住建部</Option>
                            <Option value="tom">教育部</Option>
                        </Select>
                    )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="联系人"
                        required
                    >
                    {getFieldDecorator('contact')(
                        <Input placeholder="" />
                    )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="联系电话"
                        required
                    >
                    {getFieldDecorator('phone')(
                        <Input.Group className="ant-search-input">
                            <Input placeholder="" />
                            <div className="ant-input-group-wrap">
                                <Button icon="phone" className="ant-search-btn" />
                            </div>
                        </Input.Group>
                    )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="描述"
                    >
                    {getFieldDecorator('description')(
                        <Input type="textarea" placeholder="" />
                    )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="缩略图"
                        hasFeedback
                    >
                    {getFieldDecorator('thumbnail')(
                        <Upload
                            className="avatar-uploader"
                            onChange={this.handleThumbnailChange.bind(this)}
                            fileList={this.state.thumbnailFileList}
                        >
                            <Button type="ghost">
                                <Icon type="upload" /> 上传
                            </Button>
                        </Upload>
                    )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="效果图"
                        hasFeedback
                    >
                    {getFieldDecorator('picture')(
                        <Upload
                            className="avatar-uploader"
                        >
                            <Button type="ghost">
                                <Icon type="upload" /> 上传
                            </Button>
                        </Upload>
                    )}
                    </FormItem>

                </Card>
            </div>
        );
    }
}