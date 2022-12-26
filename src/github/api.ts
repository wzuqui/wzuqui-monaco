export class GitHubApiService {
  client_id = 'Iv1.8c39cf167e7c5adc';
  client_secret = '3a3c605c9d912d4c3ab4fe8e09576970d8e8d011';
  redirect_uri = 'https://wzuquimonaco-d3pd--5173.local-corp.webcontainer.io';

  constructor() {}

  public getCode() {
    return `https://github.com/login/oauth/authorize?client_id=${
      this.client_id
    }&scope=read:user&state=${Date.now()}`;
  }

  public getToken(code: string) {
    const form = new FormData();
    form.append('client_id', 'Iv1.8c39cf167e7c5adc');
    form.append('client_secret', '3a3c605c9d912d4c3ab4fe8e09576970d8e8d011');
    form.append('code', code);
    form.append(
      'redirect_uri',
      'https://wzuquimonaco-d3pd--5173.local-corp.webcontainer.io'
    );

    const options = {
      method: 'POST',
      body: form,
    };

    return fetch('https://github.com/login/oauth/access_token', options)
      .then((response) => response.text())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  public getGists(token: string) {
    return fetch(`https://api.github.com/gists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
