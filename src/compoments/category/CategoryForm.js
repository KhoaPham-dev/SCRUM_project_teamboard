import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";

import { commonStatus, commonKinds, } from "../../constants/masterData";

import {
  STATUS_ACTIVE,
} from "../../constants";

class CategoryForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      disable: false
    };
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    

    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
        ordering: 0,
      };
    }
    return dataDetail;
  };

  render() {
    const { isEditing, formId } = this.props;
    const { disable } = this.state;
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
              fieldName="categoryName"
              min={6}
              label="Name"
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="description"
            label="Description" 
            type="textarea"
            style={{height: '120px'}}
            required
          />
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="kind"
              label="Kind"
              required
              disabled = {disable}
              options={commonKinds}
            />
          </Col>
          <Col span={12}>
          <TextField
              fieldName="ordering"
              label="Ordering"
              type="number"
              required
              requiredMsg="Please enter number"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} hidden>
            <DropdownField
              fieldName="status"
              label="Status"
              required
              options={commonStatus}
            />
          </Col>
          
          <Col span={12} hidden>
            <TextField
              fieldName="parentId"
              label="Parent ID"
              disabled
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CategoryForm;
