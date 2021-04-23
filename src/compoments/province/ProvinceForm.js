import React from "react";
import { Form, Col, Row, Input } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { ProvinceKinds } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import DropdownField from "../common/entryForm/DropdownField";

class ProvinceForm extends BasicForm {


  findProvinceKindByKey = (key, value) => {
    return ProvinceKinds[Object.keys(ProvinceKinds).find(e=>ProvinceKinds[e][key]===value)];
  }

  render() {
    const { formId, dataDetail, parentProvinces } = this.props;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={dataDetail}
      >
        {
          parentProvinces && parentProvinces.map((e, i)=>{
            if(e.id || e.id === 0){
              return (
                <Row gutter={16} key={e.id}>
                  <Col span={16}>
                    <Form.Item
                      label={`${ProvinceKinds[Object.keys(ProvinceKinds)[i]].text} Name`}
                    >
                      <Input disabled value={e.name}/>
                    </Form.Item>
                  </Col>
                </Row>
              )
            }
            return null;
          })
        }
        <Row gutter={16}>
          <Col span={16}>
            <TextField
              fieldName="provinceName"
              min={6}
              label={`${this.findProvinceKindByKey('name', dataDetail.kind ).text} Name`}
              required
              placeholder={`Please enter ${this.findProvinceKindByKey('name', dataDetail.kind ).text.toLowerCase()} name`}
            />
          </Col>
        </Row>

        <Row gutter={16}>
            <Col span={16}>
              <DropdownField
                fieldName="status"
                label="Status"
                required
                options={commonStatus}
              />
            </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16} hidden>
            <TextField fieldName="parentId" label="Parent ID" disabled/>
            <TextField fieldName="kind" label="Kind" disabled/>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProvinceForm;
