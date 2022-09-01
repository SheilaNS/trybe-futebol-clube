const errorCreate = (name: string, message: string) => {
  const err = new Error();
  err.name = name;
  err.message = message;
  return err;
};

export default errorCreate;
