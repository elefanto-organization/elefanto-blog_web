import HttpFactory from '@/repository/factory';
import {IBlogParams, IBlogResponse, IBlogInput, ICategory } from 'types';

class BlogModule extends HttpFactory {
  private RESOURCE = '/blog';

  async getBlogs(params: IBlogParams): Promise<IBlogResponse[]> {
    return await this.call<IBlogResponse[]>('GET', `${this.RESOURCE}/`, undefined, { params });
  }
  async postBlog(data: IBlogInput): Promise<IBlogResponse[]> {
    return await this.call<IBlogResponse[]>('POST', `${this.RESOURCE}/`, data);
  }
  async getCategories(): Promise<ICategory[]> {
    return await this.call<ICategory[]>('GET', `/category/`);
  }
}

export default BlogModule;