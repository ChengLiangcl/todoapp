import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearDeletedTodo } from '../../store/todoSlice';

function TodoNotifier({ message, variant = 'success' }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const prevMessage = useRef();

  useEffect(() => {
    if (message && message !== prevMessage.current) {
      enqueueSnackbar(message, { variant });
      prevMessage.current = message;
      setTimeout(() => dispatch(clearDeletedTodo()), 1500);
    }
  }, [message, variant, enqueueSnackbar, dispatch]);

  return null;
}

export default TodoNotifier;
