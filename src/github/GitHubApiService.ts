export interface GetAccessTokenResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  scope: string;
  token_type: string;
}

export interface GetUserResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: any;
  bio: string;
  twitter_username: any;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export class GitHubApiService {
  client_id = '';
  client_secret = '';
  redirect_uri = '';

  constructor() {
    this.client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
    this.client_secret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
    this.redirect_uri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    console.log(this);
  }

  public getCode() {
    return `https://github.com/login/oauth/authorize?client_id=${
      this.client_id
    }&scope=read:user&state=${Date.now()}`;
  }

  public getToken(code: string) {
    const form = new FormData();
    form.append('client_id', this.client_id);
    form.append('client_secret', this.client_secret);
    form.append('code', code);
    form.append('redirect_uri', this.redirect_uri);

    return fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: form,
    }).then(async (p) => parseAccessToken(await p.text()));
  }

  public getGists(token: string) {
    return fetch(`https://api.github.com/gists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public getUser(token: string): Promise<GetUserResponse> {
    return fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (p) => await p.json());
  }
}

function parseAccessToken(text: string) {
  const obj = text.split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  return obj as unknown as GetAccessTokenResponse;
}
