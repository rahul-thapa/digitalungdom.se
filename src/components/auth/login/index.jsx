import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import Card from 'components/card';
import stylePropType from 'react-style-proptype';

function Login({
  form,
  title,
  text,
  usernamePrefix,
  passwordPrefix,
  onSubmit,
  submitting,
  forgotPasswordLink,
  createAccountLink,
  cardStyle,
}) {
  const { getFieldDecorator } = form;
  const [usernameTouched, touchUsername] = useState(true);
  const [passwordTouched, touchPassword] = useState(true);

  const {
    username = 'Username',
    usernameRequired = 'Please input your username!',
    password = 'Password',
    passwordRequired = 'Please input your password!',
    submit = 'Log in',
    errorUsername = '',
    errorPassword = '',
  } = text;

  return (
    <Card
      title={title}
      cardStyle={cardStyle}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              touchUsername(false);
              touchPassword(false);
              onSubmit({
                username: values.username,
                password: values.password,
              });
            }
          });
        }}
      >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: usernameRequired },
              {
                validator: (rule, value, callback) => {
                  if (!usernameTouched && errorUsername) {
                    callback(errorUsername);
                  }
                  touchUsername(true);
                  callback();
                },
              },
            ],
          })(
            <Input
              prefix={usernamePrefix}
              placeholder={username}
              aria-label={username}
              aria-required="true"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: forgotPasswordLink ? 0 : null }}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: passwordRequired },
              {
                validator: (rule, value, callback) => {
                  if (!passwordTouched && errorPassword) {
                    callback(errorPassword);
                  }
                  touchPassword(true);
                  callback();
                },
              },
            ],
          })(
            <Input
              type="password"
              prefix={passwordPrefix}
              placeholder={password}
              aria-label={password}
              aria-required="true"
            />,
          )}
        </Form.Item>
        {forgotPasswordLink}
        <Form.Item style={{ marginTop: forgotPasswordLink ? 16 : null }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '100%',
            }}
            loading={submitting}
          >
            {submit}
          </Button>
          {createAccountLink}
        </Form.Item>
      </Form>
    </Card>
  );
}

Login.propTypes = {
  title: PropTypes.node,
  text: PropTypes.shape({
    password: PropTypes.string,
    passwordRequired: PropTypes.string,
    username: PropTypes.string,
    usernameRequired: PropTypes.string,
    submit: PropTypes.string,
    errorUsername: PropTypes.string,
    errorPassword: PropTypes.string,
  }),
  usernamePrefix: PropTypes.node,
  passwordPrefix: PropTypes.node,
  onSubmit: PropTypes.func,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
  }),
  forgotPasswordLink: PropTypes.node,
  createAccountLink: PropTypes.node,
  submitting: PropTypes.bool,
  cardStyle: stylePropType,
};

Login.defaultProps = {
  title: 'Log in',
  text: {},
  usernamePrefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
  passwordPrefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
  onSubmit: () => {},
  form: null,
  forgotPasswordLink: null,
  createAccountLink: null,
  submitting: false,
  cardStyle: {},
};

export default Form.create()(Login);
