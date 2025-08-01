import React from 'react';

const Form = ({ children, onSubmit, sx, ...rest }) => {
  return (
    <form onSubmit={onSubmit} {...rest} style={sx}>
      {children}
    </form>
  );
};

export default Form;
