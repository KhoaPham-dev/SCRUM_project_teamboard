import React from "react";
import { Form, Button } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import { FormItemLayoutConf } from "../../constants/formConfig";
import { showErrorMessage } from "../../services/notifyService";
import Utils from "../../utils";
import { AppConstants, UserTypes, UploadFileTypes } from "../../constants";

class ProfileForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.userData.avatar
        ? `${AppConstants.contentRootUrl}${props.userData.avatar}`
        : "",
      logo: props.userData.logoPath
        ? `${AppConstants.contentRootUrl}${props.userData.logoPath}`
        : "",
      avatarUploading: false,
    };
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setFieldValue("avatar", userData.avatar);
    this.setFieldValue("logo", userData.logoPath);
  }

  handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToConfirmPassword = (rule, value) => {
    const {
      current: { validateFields, isFieldTouched },
    } = this.formRef;
    if (isFieldTouched("confirmPassword")) {
      validateFields(["confirmPassword"], { force: true });
    }
    return Promise.resolve();
  };

  compareToPassword = (rule, password) => {
    const newPassword = this.getFieldValue("password");
    if ((password || newPassword) && password !== newPassword) {
      return Promise.reject("Password that you enter is inconsistent!");
    } else {
      return Promise.resolve();
    }
  };

  handleChangeAvatar = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ avatarUploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("avatar", result.data.filePath);
        this.setState({ avatarUploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ avatarUploading: false });
        }
      },
    });
  };

  handleChangeLogo = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ logoUploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
      onCompleted: (result) => {
        this.setFieldValue("logo", result.data.filePath);
        // this.otherData.logo = result.data.filePath;
        this.setState({ logoUploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ logoUploading: false });
        }
      },
    });
  };

  render() {
    const { loading, userData } = this.props;
    const { avatar, logo, avatarUploading, logoUploading } = this.state;

    return (
      <Form
        {...FormItemLayoutConf}
        ref={this.formRef}
        onFinish={this.handleSubmit}
        initialValues={userData}
      >
        <CropImageFiled
          fieldName="avatar"
          loading={avatarUploading}
          label="Avatar"
          imageUrl={avatar}
          onChange={this.handleChangeAvatar}
          uploadFile={this.uploadFileAvatar}
        />
        <TextField fieldName="username" label="User Name" disabled required />
        <TextField
          fieldName="fullName"
          label="Full Name"
          required
          requiredMsg="Please enter fullname"
        />
        <TextField fieldName="email" label="E-mail" type="email" />
        {userData.kind === UserTypes.SHOP ? (
          <div>
            <TextField fieldName="phone" label="Phone Number" required />
            <TextField fieldName="taxNumber" label="Tax Number" required />
            <TextField fieldName="zipCode" label="Zip Code" required />
            <TextField fieldName="city" label="City" required />
            <TextField
              fieldName="address"
              label="Address"
              type="textarea"
              required
            />
            <CropImageFiled
              fieldName="logo"
              loading={logoUploading}
              label="Logo"
              imageUrl={logo}
              onChange={this.handleChangeLogo}
              uploadFile={this.uploadFileLogo}
              required
            />
          </div>
        ) : null}
        <TextField
          type="password"
          fieldName="oldPassword"
          label="Password"
          required
          requiredMsg="Please enter password"
        />
        <TextField
          type="password"
          fieldName="password"
          label="New Password"
          validators={[this.validateToConfirmPassword]}
        />
        <TextField
          type="password"
          fieldName="confirmPassword"
          label="Confirm New Password"
          validators={[this.compareToPassword]}
        />
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button
            loading={loading}
            className="profile-form-button"
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ProfileForm;
