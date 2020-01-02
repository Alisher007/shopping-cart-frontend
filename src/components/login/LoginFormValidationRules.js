export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'name address is required';
  } else if (values.name.length < 2) {
    errors.name = 'Password must be 2 or more characters';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 2) {
    errors.password = 'Password must be 2 or more characters';
  }
  return errors;
};
