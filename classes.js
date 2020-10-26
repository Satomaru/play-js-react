export class Classes {

  constructor(basic) {
    this.value = basic;
  }

  add(...valids) {
    if (!valids.some((e) => !e)) {
      this.value += ' ' + valids.join('');
    }

    return this;
  }
}
