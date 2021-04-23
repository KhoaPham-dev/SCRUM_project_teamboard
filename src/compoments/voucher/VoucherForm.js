import React from "react";
import { Form, Col, Row } from "antd";
import moment from 'moment';

import BasicForm from "../common/entryForm/BasicForm";
import NumericField from "../common/entryForm/NumericField";

import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";

import DatePickerField from "../common/entryForm/DatePickerField";
import { convertStringToDateTime, convertDateTimeToString } from "../../utils/datetimeHelper";
import { commonStatus } from "../../constants/masterData";
import Text from "antd/lib/typography/Text";



class VoucherForm extends BasicForm {
    
  componentDidMount(){
    const { dataDetail } = this.props;
    this.setFieldValue("expiredDate", convertStringToDateTime(dataDetail.voucherExpiredDate, "DD/MM/YYYY HH:mm:ss", "DD/MM/YYYY"));
  }
  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    const voucherExpiredDate = convertDateTimeToString(formValues.expiredDate, "DD/MM/YYYY")  + " 00:00:00";
    onSubmit({
        ...formValues,
        voucherExpiredDate,
        ...this.otherData
    });
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  render() {
    const { isEditing, formId, dataDetail } = this.props;
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
                    <DatePickerField disabledDate={this.disabledDate} required label="Expired Date" format="DD/MM/YYYY" fieldName="expiredDate" width="100%"/>
                </Col>
                    {
                    !isEditing ? (
                        <Col span={12}>
                        <NumericField
                            fieldName="voucherAmount"
                            label="Amount"
                            required
                            min={1}
                            max={99}
                            width="100%"
                        />
                        </Col>
                        ) : null
                    }
            </Row>
        <Row gutter={16}>
            <Col span={12}>
            <NumericField
                fieldName="voucherMoney"
                label="Money"
                required
                min={0}
                width="100%"
                disabled={isEditing}
            />
            </Col>
            <Col span={12}>
            <NumericField
            fieldName="voucherPrice"
            label="Price"
            required
            min={0}
            width="100%"
            disabled={isEditing}
            />
            </Col>
        </Row>
        
        {
            isEditing ?  (
                <>
                <Row gutter={16}>
                    <Col span={12}>
                        <NumericField
                        fieldName="id"
                        label="ID"
                        min={0}
                        width="100%"
                        disabled
                        />
                    </Col>
                    <Col span={12}>
                    <TextField
                    fieldName="voucherCode"
                    label="Code"
                    disabled
                    />
                    </Col>
                </Row>
                <Row gutter={16}>
                <Col span={12}>
                <TextField
                fieldName="voucherSerial"
                label="Serial"
                disabled
                />
                </Col>
                <Col span={12}>
                    <DropdownField
                        fieldName="status"
                        label="Status"
                        required
                        options={commonStatus}
                        />
                </Col>
                </Row>
                </>
            ) : null
        }
      </Form>
    );
  }
}

export default VoucherForm;
