import { renderHook } from '@testing-library/react';
import useForm from '../hooks/useForm'; // fix hook name
import { initial } from '../formConfigs/signupFormConfig'; // you don't need inputList here unless used in tests

test('initial form state', () => {
  const { result } = renderHook(() => useForm(initial));
  for (const [name] of Object.entries(initial)) {
    expect(result.current.inputs[name].value).toBe('');
  }
});
