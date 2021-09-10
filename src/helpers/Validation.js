/**
 * Class Validation
 */
class Validation {
  /**
   * checks for whitespace in field
   * @param {string} field
   * @returns {boolean} true | false
   */
  static hasWhiteSpace(field) {
    return !field || field.length === 0 || /^\s*$/.test(field);
  }

  /**
   * checks if fields are empty and returns true or false
   * @param {array} fields array of field objects
   * @returns {object} true | false status
   */
  static checkEmptyFields(fields) {
    let errors = {};
    let status = true;
    fields = fields.reverse();
    fields.map((field) => {
      if (!field.value || this.hasWhiteSpace(field.value)) {
        status = false;
        errors = {field: field.name};
      }
    });
    return {
      status,
      errors,
    };
  }

  /**
   * validates an email field
   * @param {string} email
   * @returns {boolean} true | false
   */
  static validateEmail(email) {
    const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * validates thepassword fields
   * @param {string} value1 value of password
   * @param {string} value2 confirm password
   * @param {number} min minimum length of password
   */
  static passwordCheck(value1, value2, min) {
    let error = '';
    let status = true;
    if (value1.length < min) {
      status = false;
      error = `Password must be more than ${min} characters`;
    } else if (value1 !== value2) {
      status = false;
      error = 'Passwords do not match';
    }

    return {
      status,
      error,
    };
  }
}

export default Validation;
