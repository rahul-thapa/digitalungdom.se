import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import Card from 'components/card';

function Login({
  form,
  title,
  passwordText,
  usernameText,
  submitText,
  usernamePrefix,
  passwordPrefix,
  errorUsername,
  submit,
  submitting,
  forgotPasswordLink,
  createAccountLink,
}) {
  const { getFieldDecorator } = form;

  return (
    <Card
      title={title}
    >
      <Form>
        <Form.Item
          validateStatus={errorUsername ? 'error' : null}
          help={errorUsername}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={usernamePrefix}
              placeholder={usernameText}
              aria-label={usernameText}
              aria-required="true"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: forgotPasswordLink ? 0 : null }}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              type="password"
              prefix={passwordPrefix}
              placeholder={passwordText}
              aria-label={passwordText}
              aria-required="true"
            />,
          )}
          {forgotPasswordLink}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={submit}
            style={{
              width: '100%',
            }}
            loading={submitting}
          >
            {submitText}
          </Button>
          {createAccountLink}
        </Form.Item>
      </Form>
    </Card>
  );
}

Login.propTypes = {
  title: PropTypes.string,
  passwordText: PropTypes.string,
  usernameText: PropTypes.string,
  submitText: PropTypes.string,
  usernamePrefix: PropTypes.node,
  passwordPrefix: PropTypes.node,
  errorUsername: PropTypes.string,
  submit: PropTypes.func,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
  }),
  forgotPasswordLink: PropTypes.node,
  createAccountLink: PropTypes.node,
  submitting: PropTypes.bool,
};

Login.defaultProps = {
  title: 'Log in',
  passwordText: 'Password',
  usernameText: 'Username',
  submitText: 'Log in',
  errorUsername: '',
  usernamePrefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
  passwordPrefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
  submit: () => {},
  form: null,
  forgotPasswordLink: null,
  createAccountLink: null,
  submitting: false,
};

export default Form.create()(Login);
