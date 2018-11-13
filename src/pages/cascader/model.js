import { observable, action, runInAction } from 'mobx';

const indentity = () => null;

export default class Selector {
  request = indentity;

  @observable.ref
  data = [];

  @observable
  loading = false;

  @observable
  error = null;

  constructor(request) {
    this.request = request;
  }

  @action.bound
  async fetchData(query, onLoad = indentity, onError = indentity) {
     
    this.data = [];
    this.loading = true;
    try {
      const data = await this.request(query);
      onLoad(data);
      runInAction(() => {
        this.data = data;
        this.error = null;
        this.loading = false;
      });
      return data;
    } catch (error) {
      onError(error);
      runInAction(() => {
        this.error = error;
        this.loading = false;
      });
      return error;
    }
  }
}
