import { $Fetch } from 'ohmyfetch';


class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /** 
    * method - GET, POST, PUT
    * URL
  **/
  async call<T>(method: string, url: string, data?: object, extras = {}): Promise<T> {
    const config : any = {
      ...extras,
    }
    if (!url.includes('token') && process.client) {
      const token = localStorage.getItem('token')
      config.headers = {
          'Authorization': `Bearer ${token}`
        }
    }

      const $res: T = await this.$fetch(url, { method, body: data, ...config });
      return $res;
  }
}

export default HttpFactory;