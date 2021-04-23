import React from "react";
import { Form, Col, Row, List } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";


class SettingForm extends BasicForm {

  getInitialValue = () => {
    const { dataDetail } = this.props;
    return dataDetail[0];
  }

  render() {
    const { formId, dataDetail } = this.props;

    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialValue()}
      >
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="agencyName"
                label="Name"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="agencyPhone"
                label="Phone"
              />
            </Col>
          </Row>
        
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                    label="List of services"
                    name="listServices"
              >
                <List
                  bordered
                  dataSource={dataDetail ? dataDetail.map(a=>(
                    a.serviceName
                  )) : []}
                  renderItem={item=>(
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
      </Form>
    );
  }
}

export default SettingForm;
