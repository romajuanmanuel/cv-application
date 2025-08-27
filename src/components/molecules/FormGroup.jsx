// src/components/molecules/FormGroup.jsx
import Label from "../atoms/Label";
import InputField from "../atoms/InputField";
import PropTypes from "prop-types";

const FormGroup = ({ id, label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <InputField
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FormGroup;
