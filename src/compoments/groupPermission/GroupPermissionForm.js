import React from 'react';
import { Form, Col, Row, Checkbox, Card } from 'antd';

import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import DropdownField from '../common/entryForm/DropdownField';

import { groupPermissionTypes } from '../../constants/masterData';

class GroupPermissionForm extends BasicForm {

    componentWillMount() {
        this.props.getPermissionList();
    }

    getGroupPermission = () => {
        const { permissions } = this.props;
        let groups;
        if(permissions && permissions.length > 0) {
            groups = permissions.reduce((r, a) => {
                r[a.nameGroup] = [...r[a.nameGroup] || [], a];
                return r;
               }, {});
        }
        return groups;
    }

    render() {
        const { formId, dataDetail, isEditing } = this.props;
        const groupPermissions = this.getGroupPermission();

        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={dataDetail}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <TextField fieldName="name" label="Name" required/>
                            </Col> 
                        </Row>
                        <Row>
                            <Col span={24} hidden={isEditing}>
                                    <DropdownField
                                        optionValue="value"
                                        optionLabel="label"
                                        fieldName="kind"
                                        label="Kind"
                                        required
                                        options={groupPermissionTypes}
                                    />
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col span={12}>
                        <TextField style={{height: '150px'}} fieldName="description" label="Description" type="textarea" required/>
                    </Col>
                </Row>


                
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="permissions" label="Group Permissions"
                            rules={[
                                { required: true, message: 'Please choose permission'}
                            ]}
                        >
                           <Checkbox.Group style={{ width: '100%' }}>    
                            {
                                groupPermissions
                                ?
                                Object.keys(groupPermissions).map(groupName =>
                                    <Card key={groupName} size="small" title={groupName}  style={{ width: '100%', marginBottom: '4px' }}>
                                        <Row>
                                        {
                                            groupPermissions[groupName].map(permission =>
                                                <Col span={8} key={permission.id}>
                                                    <Checkbox value={permission.id}>{permission.name}</Checkbox>
                                                </Col>
                                            )
                                        }
                                        </Row>
                                    </Card>
                                    )
                                :
                                null
                            }
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        );
    }
}

export default GroupPermissionForm;