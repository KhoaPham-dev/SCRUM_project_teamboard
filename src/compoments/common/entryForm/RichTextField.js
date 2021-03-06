import React from 'react';

import { Form } from 'antd';
import ReactQuill from 'react-quill'; // ES6

import BaseField from './BaseField';

import 'react-quill/dist/quill.snow.css'; // ES6
import { showErrorMessage } from "../../../services/notifyService";

const AlignStyle = ReactQuill.Quill.import('attributors/style/align');
ReactQuill.Quill.register(AlignStyle, true);

function imageHandler(){
    const _this3 = this;
	
	          let fileInput = this.container.querySelector('input.ql-image[type=file]');
	          if (fileInput == null) {
	            fileInput = document.createElement('input');
	            fileInput.setAttribute('type', 'file');
	            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
	            fileInput.classList.add('ql-image');
	            fileInput.addEventListener('change', function () {
	              if (fileInput.files != null && fileInput.files[0] != null) {
	                const reader = new FileReader();
	                reader.onload = function (e) {
                        if(e.total < 1000000){
                            const index = _this3.quill.getSelection(true).index;
                            _this3.quill.insertEmbed(index, 'image', e.target.result);
                            _this3.quill.setSelection(index + 1);
                            fileInput.value = "";
                        }
                        else{
                            showErrorMessage("Image size is too big. Please upload a smaller image!");
                        }
	                };
	                reader.readAsDataURL(fileInput.files[0]);
	              }
	            });
	            this.container.appendChild(fileInput);
	          }
	          fileInput.click();
}

const modules = {
    toolbar: {
        container:[
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'],
        ],
        handlers: {
            // handlers object will be merged with default handlers object
            'image': imageHandler
        }
    },
    clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image',
  ]

class RichTextField extends BaseField {
    render() {
        const {
            label,
            disabled,
            fieldName
        } = this.props;
        return (
            <Form.Item name={fieldName} label={label} valuePropName="defaultValue">
                <ReactQuill
                    defaultValue=""
                    formats={formats}
                    modules={modules}
                    disabled={disabled}
                />

            </Form.Item>
        )
    }
}

export default RichTextField;
