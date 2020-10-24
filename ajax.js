function showError(error) {
  window.alert(error.message || error);
}

export class Ajax {

  constructor(url) {
    this.url = url;
    this.options = { method: 'GET' };
  }

  setPost(data) {
    this.options = {
      method: 'POST',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      body: data
    }

    return this;
  }

  fetch(callback, catchError = showError) {
    fetch(this.url, this.options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ajax failure: HTTP ${response.status} ${this.options.method} ${this.url}`);
        }

        return response.json();
      })
      .then(callback)
      .catch(catchError);
  }
}
