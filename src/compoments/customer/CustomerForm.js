import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import FieldSet from "../common/elements/FieldSet";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import DatePickerField from "../common/entryForm/DatePickerField";
import { commonLanguages, commonSex } from "../../constants/masterData";
import { convertStringToDateTime, convertDateTimeToString } from "../../utils/datetimeHelper";
import {
  AppConstants,
  UploadFileTypes,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class CustomerForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.dataDetail.avatarPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.avatarPath}`
        : "",
      uploading: false,
      provinces: [],
      districts: [],
      wards: [],
    }
  }

  componentDidMount() {
    const { dataDetail, getProvinceCombobox } = this.props;
    this.setFieldValue("date", convertStringToDateTime(dataDetail.birthday, "DD/MM/YYYY HH:mm:ss", "DD/MM/YYYY"));
    if(dataDetail.provinceDto){
      getProvinceCombobox({ params: {}});
      if(dataDetail.districtDto){
        getProvinceCombobox({ 
          params: {
            province:{
              parentId: dataDetail.districtDto.parentId,
              comboboxType: 'districtCombobox'
            }
          }
        });
        if(dataDetail.communeDto){
          getProvinceCombobox({ 
            params: {
              province:{
                parentId: dataDetail.communeDto.parentId,
                comboboxType: 'wardCombobox'
              }
            }
          });
        }
      }
      
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { provinceCombobox, districtCombobox, wardCombobox } = this.props;
    if (
      JSON.stringify(provinceCombobox) !== JSON.stringify(nextProps.provinceCombobox)
      ){
        this.setState({provinces: nextProps.provinceCombobox.length > 0 ? this.convertToSelectionData(nextProps.provinceCombobox) : []});
      }
    if (
      JSON.stringify(districtCombobox) !== JSON.stringify(nextProps.districtCombobox)
      ){
        this.setState({districts: nextProps.districtCombobox.length > 0 ? this.convertToSelectionData(nextProps.districtCombobox) : []});
      }
    if (
      JSON.stringify(wardCombobox) !== JSON.stringify(nextProps.wardCombobox)
      ){
        this.setState({wards: nextProps.wardCombobox.length > 0 ? this.convertToSelectionData(nextProps.wardCombobox) : []});
      }
  }

  convertToSelectionData = (data) =>{
    return data.map(e=>({
      value: e.provinceId,
      label: e.provinceName,
    }))
  }

  handleChangeAvatar = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("avatarPath", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };


  handleChangeProvince = (comboboxType, parentId) => {
    const { getProvinceCombobox } = this.props;
    if(comboboxType === "provinceCombobox"){
      getProvinceCombobox({
        params: {
          province:{
            parentId,
            comboboxType: 'districtCombobox'
          }
        }
      })
      this.setFieldValue('provinceDto', { provinceId: parentId });
      console.log(this.getFieldValue('provinceDto'))
      //clear ward on state
      getProvinceCombobox({
        params:{
          province:{
            isClearThisComboxType: true,
            comboboxType: 'wardCombobox',
          }
        }
      })
      //clear district and ward field
      this.setFieldValue("districtDto", undefined);
      this.setFieldValue("communeDto", undefined);
    }
    else if(comboboxType === "districtCombobox"){
      getProvinceCombobox({
        params: {
          province:{
            parentId,
            comboboxType: 'wardCombobox'
          }
        }
      })
      //clear ward field only
      this.setFieldValue("communeDto", undefined);
    }

  }
  handleSubmit(formValues) { 
    const { onSubmit } = this.props;
    const provinceId = formValues.provinceDto.provinceId;
    const districtId = formValues.districtDto.provinceId;
    const communeId = formValues.communeDto.provinceId;
    const birthday = convertDateTimeToString(formValues.date, "DD/MM/YYYY")  + " 00:00:00";
    onSubmit({
        ...formValues,
        ...this.otherData,
        birthday,
      provinceId,
      districtId,
      communeId,
    });
  }

  componentWillUnmount(){
    const { getProvinceCombobox } = this.props;
    //clear province on state
    getProvinceCombobox({
      params:{
        province:{
          isClearThisComboxType: true,
          comboboxType: 'provinceCombobox',
        }
      }
    })
    //clear district on state
    getProvinceCombobox({
      params:{
        province:{
          isClearThisComboxType: true,
          comboboxType: 'districtCombobox',
        }
      }
    })
    //clear ward on state
    getProvinceCombobox({
      params:{
        province:{
          isClearThisComboxType: true,
          comboboxType: 'wardCombobox',
        }
      }
    })
    this.handleReset();
  }

  render() {
    const { formId, dataDetail, commonStatus } = this.props;
    const { avatar, uploading } = this.state;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={dataDetail}
      >
        <FieldSet title="Customer Information" className="bold-fieldset custom-fieldset">
          <Row gutter={16}>
              <Col span={12}>
                  <CropImageFiled
                      fieldName="avatarPath"
                      loading={uploading}
                      label="Avatar"
                      imageUrl={avatar}
                      onChange={this.handleChangeAvatar}
                      uploadFile={this.uploadFileAvatar}
                      required
                      requiredMsg="Please enter avatar"
                  />
              </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
                <TextField
                  fieldName="fullName"
                  label="Full Name"
                  required
                />
              </Col>
              <Col span={12}>
                <DatePickerField required label="Birthday" format="DD/MM/YYYY" fieldName="date" width="100%"/>
              </Col>
          </Row>

                
          <Row gutter={16}>
          <Col span={12}>
              <TextField
                type="number"
                fieldName="phone"
                label="Phone Number"
                required
                minLength={10}
                disabled
              />
            </Col>
            <Col span={12}>
              <TextField fieldName="email" label="E-mail" type="email" disabled required/>
            </Col>
            
          </Row>

          <Row gutter={16}>
          
              <Col span={12}>
                <DropdownField
                  fieldName="lang"
                  label="Language"
                  required
                  options={commonLanguages}
                />
              </Col>
              <Col span={12}>
                <TextField
                  fieldName="username"
                  label="Username"
                  required
                  disabled
                />
              </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                fieldName="status"
                label="Status"
                required
                options={commonStatus}
              />
            </Col>
            <Col span={12}>
              <DropdownField
                fieldName="sex"
                label="Sex"
                required
                options={commonSex}
              />
            </Col>
          </Row>
        </FieldSet>

        <FieldSet title="Address" className="bold-fieldset custom-fieldset margin-top-fieldset">
          <Row gutter={16}>
              <Col span={12}>
                  <DropdownField
                    fieldName={["provinceDto", "provinceId"]}
                    label="Province"
                    required
                    options={this.state.provinces || []}
                    onChange={(id)=>{this.handleChangeProvince('provinceCombobox', id)}}
                  />
              </Col>
              <Col span={12}>
                <DropdownField
                  disabled={this.state.districts.length > 0 ? false : true}
                  fieldName={["districtDto", "provinceId"]}
                  label="District"
                  required
                  options={this.state.districts || []}
                  onChange={(id)=>{this.handleChangeProvince('districtCombobox', id)}}
                />
              </Col>
              
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                disabled={this.state.wards.length > 0 ? false : true}
                fieldName={["communeDto", "provinceId"]}
                label="Ward"
                required
                options={this.state.wards || []}
                onChange={(id)=>{this.handleChangeProvince('wardCombobox', id)}}
              />
            </Col>
        </Row>
        </FieldSet>
      </Form>
    );
  }
}

export default CustomerForm;
