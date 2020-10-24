export const appUtils = {
  isNullish: (value) => value === null || value === undefined,

  compare: (value1, value2) => {
    const nullishValue1 = appUtils.isNullish(value1);
    const nullishValue2 = appUtils.isNullish(value2);

    if (nullishValue1) {
      return (nullishValue2) ? 0 : -1;
    }

    if (nullishValue2) {
      return 1;
    }

    if (value1 === value2) {
      return 0;
    }

    return (value1 < value2) ? -1: 1;
  },

  comparator: {
    create: (extractor, reverse = false) =>
      (value1, value2) => {
        const result = appUtils.compare(extractor(value1), extractor(value2));
        return (reverse) ? -result : result;
      },

    bundle: (...comparators) =>
      (value1, value2) => {
        for (const comparator of comparators) {
          const result = comparator(value1, value2);

          if (result !== 0) {
            return result;
          }
        }

        return 0;
      }
  }
}
