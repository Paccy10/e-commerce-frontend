const checkValidity = (value, rules) => {
  let isValid = true;
  let message = null;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    message = !isValid ? 'This field is required' : null;
  }

  if (rules.isEmail) {
    // eslint-disable-next-line no-useless-escape
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    isValid = mailFormat.test(value) && isValid;
    message = !isValid ? 'Invalid email' : null;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    message = !isValid
      ? `This field should have a minimum length of ${rules.minLength}`
      : null;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    message = !isValid
      ? `This field should have a maximum length of ${rules.maxLength}`
      : null;
  }
  return { isValid, message };
};

export default checkValidity;
