import { notification } from 'antd';

const showSucsessMessage = (content) => {
    notification.success({
        message: 'Success',
        description: content
    });
}

const showErrorMessage = (content) => {
    notification.error({
        message: 'Error',
        description: content
    });
}

const showWarningMessage = (content) => {
    notification.warning({
        message: 'Error Message',
        description: content
    });
}

export {
    showErrorMessage,
    showWarningMessage,
    showSucsessMessage,
}