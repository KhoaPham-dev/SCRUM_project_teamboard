import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import BooleanField from "../common/entryForm/BooleanField";


class SettingForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        editable: true,
      };
    }
    return dataDetail;
  };

  render() {
    const { isEditing, formId } = this.props;

    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="name"
              min={6}
              label="Name"
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="group" min={6} label="Group" required disabled={isEditing}/>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField fieldName="key" label="Key" required={!isEditing} disabled={isEditing}/>
          </Col>
          <Col span={12}>
            <TextField fieldName="value" label="Value" required/>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <TextField type="textarea" fieldName="description" label="Description" />
          </Col>
          <Col span={12} hidden={isEditing}>
            <BooleanField fieldName="editable" label="Editable" disabled={isEditing}/>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SettingForm;
