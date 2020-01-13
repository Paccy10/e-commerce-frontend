import checkValidity from '../../utils/checkValidity';

describe('checkValidity Function', () => {
  it('should check if the value is required', () => {
    const value = '';
    const rules = {
      required: true
    };
    const validation = checkValidity(value, rules);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toBe('This field is required');
  });

  it('should check if the value has the required min length', () => {
    const value = 'ab';
    const rules = {
      minLength: 3
    };
    const validation = checkValidity(value, rules);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toBe(
      'This field should have a minimum length of 3'
    );
  });

  it('should check if the value has the required max length', () => {
    const value = 'abcdefg';
    const rules = {
      maxLength: 6
    };
    const validation = checkValidity(value, rules);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toBe(
      'This field should have a maximum length of 6'
    );
  });

  it('should check if the value is a vaild email', () => {
    const value = 'email';
    const rules = {
      isEmail: true
    };
    const validation = checkValidity(value, rules);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toBe('Invalid email');
  });
});
