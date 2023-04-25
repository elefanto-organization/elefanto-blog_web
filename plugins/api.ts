import { $fetch,FetchOptions } from 'ohmyfetch';
import { defineNuxtPlugin } from '#app';
import AuthModule from '~~/repository/modules/auth';
import BlogModule from '~~/repository/modules/blog';

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: AuthModule,
  blog: BlogModule
}

export default defineNuxtPlugin((nuxtApp) => {

  
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.API_BASE_URL,
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions);

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
    blog: new BlogModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});