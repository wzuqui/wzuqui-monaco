import { useEffect, useState } from 'react';
import { GetUserResponse, GitHubApiService } from './api';

interface Props {
  clientId: string;
}

export function GitHubLogin(props: Props) {
  const service = new GitHubApiService();
  const code = getCode();
  const [token, setToken] = useState('');
  const [user, setUser] = useState<GetUserResponse | null>(null);

  useEffect(() => {
    (async function () {
      if (!code) return;
      if (token !== '') return;
      try {
        const tokenResponse = await service.getToken(code);
        if (tokenResponse.access_token) {
          setToken(tokenResponse.access_token);
        }
      } catch (error) {
        console.log('GitHubLoginZuqui.useEffect', error);
      }
    })();
  }, [token]);

  useEffect(() => {
    (async function () {
      if (token === '') return;
      const userResponse = await service.getUser(token);
      setUser(userResponse);
    })();
  }, [token]);

  function handleLogin() {
    window.location.href = service.getCode();
  }
  return (
    <>
      <button onClick={handleLogin}>
        {code === null ? 'Login' : 'Refazer Login'}
      </button>
      <span>{user?.name}</span>
    </>
  );
}

function getCode(): string | null {
  if (location.search.includes('?code=')) {
    try {
      const retorno = `${location.search
        .replace(/^\?code=/g, '')
        .split('&')
        .reverse()
        .pop()}`;
      return retorno;
    } catch (error) {
      console.log('não conseguiu obter code', error);
    }
  }
  return null;
}
