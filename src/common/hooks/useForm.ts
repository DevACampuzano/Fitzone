import { useState } from 'react';

const stateToFocuses = <T extends object>(
  state: T,
): Record<string, boolean> => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};

export const useForm = <T extends object>(
  initState: T,
  validator?: ValidateProps<T>,
) => {
  const inititialFocuses = stateToFocuses(initState);
  const [state, setState] = useState<T>(initState);
  const [focuses, setFocuses] = useState(inititialFocuses);
  const [touched, setTouched] = useState<{
    [K in keyof T]?: boolean;
  }>({});
  const [errors, setErrors] = useState<{
    [K in keyof T]?: string;
  }>({});
  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const onChange = async (key: keyof T, Tvalue: string | number | boolean) => {
    setState({
      ...state,
      [key]: Tvalue,
    });
    if (touched[key]) {
      validateFieldsText(key);
    }
  };

  const setForm = (form: T) => {
    setState({
      ...form,
    });
  };

  const resetForm = () => {
    setForm(initState);
  };

  const isValidRegExpObject = (
    obj: ValidateProps<T>,
  ): obj is ValidateProps<T> & Record<string, RegExp> => {
    for (const key in obj) {
      const value = obj[key];
      if (
        value &&
        typeof value.validate === 'object' &&
        value.validate.constructor.name === 'RegExp'
      ) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  };

  const validateFieldsText = (value: keyof ValidateProps<T>) => {
    if (!validator) {
      throw new Error('To use this feature you need the validators.');
    }

    const v = validator[value]?.validate as RegExp;
    const result = !v.test(state[value] as string);

    if (result) {
      setErrors({
        ...errors,
        [value]: validator[value]?.message,
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[value];
      setErrors(newErrors);
    }
    return result;
  };

  const onChangeFocus = (key?: keyof T) => {
    const f = { ...focuses };
    for (const keys in state) {
      if (keys === key) {
        f[keys] = true;
      } else {
        f[keys] = false;
      }
    }

    setFocuses(f);
  };

  const handleBlur = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (validator && validator[field]) {
      return validateFieldsText(field);
    }
  };

  if (validator && !isValidRegExpObject(validator)) {
    throw new Error('All validator fields must be of RegEx type.');
  }

  return {
    ...state,
    form: state,
    focuses,
    onChange,
    setForm,
    resetForm,
    getBase64,
    validateFieldsText,
    onChangeFocus,
    errors,
    handleBlur,
    touched,
  };
};
