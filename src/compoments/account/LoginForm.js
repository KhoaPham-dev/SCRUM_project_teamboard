import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

const LoginForm = ({ loading, onLogin }) => {
    

    const handleSubmit = (values)  => {
        onLogin(values);
    }


    return (
        <Form onFinish={handleSubmit} className="login-form">
            <FormItem
                name= "username"
                rules = {[{ required: true, message: 'Please input username!' }]}
            >
                <Input 
                    prefix={<UserOutlined/>}
                    size="large"
                    name="username" 
                    placeholder="Username" />    
            </FormItem>
            <FormItem
                name= "password"
                rules={[{ required: true, message: 'Please input password!' }]}
            >
                <Input 
                    prefix={<LockOutlined/>}
                    size="large"
                    name="password" 
                    type="password" 
                    placeholder="Password"  />
            </FormItem>
            <FormItem>
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button">
                    Login
                </Button>
                
            </FormItem>
            <center className="s-mt4px"><small>© Developed by DBxMN</small></center>
        </Form>
    );
}

export default LoginForm;