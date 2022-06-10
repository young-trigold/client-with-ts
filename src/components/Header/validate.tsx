import { message } from '../Message/Message';

const validateName = (name: string) => {
  const userName = '用户名';
  let result = false;

  if (/\s/.test(name)) {
    message.warn(`${userName}不能含有空白字符!`);
  } else if (name.replace(/\s/g, '').length < 1) {
    message.warn(`${userName}不能为空!`);
  } else if (name.replace(/\s/g, '').length > 16) {
    message.warn(`${userName}太长!`);
  } else {
    result = true;
  }

  return result;
};

const validatePwd = (pwd: string) => {
  const pwdText = '密码';
  let result = false;

  if (/\s/.test(pwd)) {
    message.warn(`${pwdText}不能含有空白字符!`);
  } else if (pwd.replace(/\s/g, '').length < 6) {
    message.warn(`${pwdText}小于6位!`);
  } else {
    result = true;
  }

  return result;
};

export { validateName, validatePwd };
