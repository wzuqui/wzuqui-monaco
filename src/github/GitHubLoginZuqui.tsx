import { useEffect, useState } from 'react';
import { GitHubApiService } from './api';

interface Props {
  clientId: string;
}

export function GitHubLoginZuqui(props: Props) {
  const service = new GitHubApiService('https://cors-anywhere.herokuapp.com/');
  const code = getCode();

  useEffect(() => {
    (async function () {
      if (code) {
        try {
          const response = await service.getToken(code);
          const data = await response.text();
          console.log('GitHubLoginZuqui.useEffect.response', response);
        } catch (error) {
          console.log('GitHubLoginZuqui.useEffect', error);
        }
      }
    })();
  }, []);

  function handleLogin() {
    location = service.getCode();
  }
  return (
    <button onClick={handleLogin}>
      {code === null ? 'Login' : 'Refazer Login'}
    </button>
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
