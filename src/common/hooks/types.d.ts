type ValidateProps<T> = {
  [K in keyof T]?: {
    message: string;
    validate: RegExp;
  };
};
