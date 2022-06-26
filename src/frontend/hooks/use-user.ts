import { useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';

export function useUser() {
  const getUser = useCallback(() => {
    return window.localStorage.getItem('@username');
  }, []);

  const editName = useCallback(async (name) => {
    if (name.length > 4) return new Error('Your name should be less than 5 letters');

    window.localStorage.setItem('@username', name);
  }, []);

  const {
    data: user,
    mutate,
    error,
  } = useSWRImmutable('@user', getUser, {
    shouldRetryOnError: false,
  });

  return { user, editName, mutate, error };
}
