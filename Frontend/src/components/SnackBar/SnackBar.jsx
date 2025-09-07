import * as React from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

function TodoNotifier({ message, variant = 'success' }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant });
    }
  }, [message, variant, enqueueSnackbar]);

  return null;
}

export default TodoNotifier;
