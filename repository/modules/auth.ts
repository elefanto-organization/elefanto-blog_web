import HttpFactory from '@/repository/factory';
import {ILoginInput, ILoginResponse } from 'types';

class AuthModule extends HttpFactory {
  private RESOURCE = '/token';

  async login(credentials: ILoginInput): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('POST', `${this.RESOURCE}/`, credentials);
  }
}

export default AuthModule;