
import { useState, useCallback } from 'react';

const useFormValidator = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((name, value) => {
    let error = "";

    switch (name) {
      case 'email':
        if (!value) {
          error = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Por favor, introduce un correo electrónico válido.";
        }
        break;
      case 'phone':
        if (value && !/^[0-9+\-\s()]{9,15}$/.test(value)) {
          error = "El teléfono debe tener entre 9 y 15 dígitos.";
        }
        break;
      case 'password':
        if (!value) {
           error = "La contraseña es obligatoria.";
        } else if (value.length < 8) {
          error = "La contraseña debe tener al menos 8 caracteres.";
        } else if (!/[A-Z]/.test(value)) {
          error = "La contraseña debe incluir al menos una mayúscula.";
        } else if (!/[0-9]/.test(value)) {
          error = "La contraseña debe incluir al menos un número.";
        }
        break;
      case 'url':
        if (value && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)) {
          error = "Por favor, introduce una URL válida.";
        }
        break;
      case 'name':
      case 'subject':
      case 'message':
        if (!value || value.trim().length === 0) {
          error = "Este campo es obligatorio.";
        }
        break;
      default:
        break;
    }

    return error;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if touched
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isValid = () => {
    const newErrors = {};
    let valid = true;
    Object.keys(values).forEach(key => {
      const error = validate(key, values[key]);
      if (error) {
        newErrors[key] = error;
        valid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return valid;
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, isValid, resetForm, setValues };
};

export default useFormValidator;
