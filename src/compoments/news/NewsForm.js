import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { commonStatus } from "../../constants/masterData";
import NumericField from "../common/entryForm/NumericField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import RichTextField from "../../compoments/common/entryForm/RichTextField";

import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
  } from "../../constants";
  import Utils from "../../utils";
  import { showErrorMessage } from "../../services/notifyService";


class NewsForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
          avatar: props.dataDetail.newAvatar
            ? `${AppConstants.contentRootUrl}/${props.dataDetail.newAvatar}`
            : "",
          uploading: false,
          //content: props.dataDetail.newContent || "",
        };
        //this.otherData.newContent = props.dataDetail.newContent || "";
        // this.modules = {
        //     toolbar: {
        //         container: [
        //              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        //              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        //              ['link', 'image'],
        //              ['clean']
        //          ],
        //          handlers: {
        //               // handlers object will be merged with default handlers object
        //            'image': imageHandler
        //         }
        //     },
        //     clipboard: {
        //       // toggle to add extra line breaks when pasting HTML:
        //       matchVisual: false,
        //     }
        //   }
        //   this.formats = [
        //     'header', 'font', 'size',
        //     'bold', 'italic', 'underline', 'strike', 'blockquote',
        //     'list', 'bullet', 'indent',
        //     'link', 'image', 'video'
        //   ]
    }

    getInitialFormValues = () => {
        const { isEditing, dataDetail, categoryOptions } = this.props;
        if (!isEditing) {
          return {
            status: STATUS_ACTIVE,
            categoryId: categoryOptions[0] && categoryOptions[0].value,
            newOrdering: 0,
          };
        }
        return dataDetail;
      };

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
            this.setFieldValue("newAvatar", result.data.filePath);
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
    // rteChange = (content, delta, source, editor) => {
    //     this.otherData.newContent = content;
    //     this.setState({ content });
    // }
  render() {
    const { formId, categoryOptions } = this.props;
    const { uploading, avatar } = this.state;
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
                <CropImageFiled
                    fieldName="newAvatar"
                    loading={uploading}
                    label="Avatar"
                    imageUrl={avatar}
                    onChange={this.handleChangeAvatar}
                    uploadFile={this.uploadFileAvatar}
                    required
                    requiredMsg="Please enter avatar"
                />
            </Col>
            <Col span={12}>
            <TextField
                fieldName="newTitle"
                label="Title"
                required
            />
            </Col>
        </Row>
    
        <Row gutter={16}>
            <Col span={12}>
                <DropdownField
                fieldName="categoryId"
                label="Category"
                required
                options={categoryOptions}
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

        <Row gutter={16}>
          <Col span={12}>
            <NumericField
                width="100%"
                fieldName="newOrdering"
                label="Ordering"
                min={0}
                required
            />
          </Col>
          <Col span={12}>
                <TextField
                    fieldName="newDescription"
                    label="Description"
                    type="textarea"
                    style={{height: "200px"}}
                />
            </Col>
        </Row>
        
        <Row gutter={16}>
            <Col span={24}>
                {/* <div className="ant-col ant-form-item-label">
                    <label className="ant-form-item" title="Content">
                        Content
                    </label>
                </div>
                <ReactQuill theme="snow"  modules={this.modules}
                    formats={this.formats} onChange={this.rteChange}
                    value={this.state.content}/> */}
                <RichTextField label="Content" fieldName="newContent"/>
            </Col>
        </Row>
      </Form>
    );
  }
}

export default NewsForm;
