import { useState } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { validateContactForm } from '../../utils/validation';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const { errors: validationErrors } = validateContactForm(formData);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const { errors: validationErrors, isValid } = validateContactForm(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (!isValid) return;

    const result = await onSubmit(formData);
    
    if (result?.success) {
      setFormData(initialFormState);
      setErrors({});
      setTouched({});
    }
  };

  const { isValid } = validateContactForm(formData);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Contact</h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full name"
          error={touched.name ? errors.name : ''}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email address"
          error={touched.email ? errors.email : ''}
          required
        />

        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter phone number"
          error={touched.phone ? errors.phone : ''}
          required
        />

        <Textarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your message (optional)"
          error={touched.message ? errors.message : ''}
          rows={3}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          loading={loading}
          className="w-full mt-2"
        >
          {loading ? 'Adding Contact...' : 'Add Contact'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
