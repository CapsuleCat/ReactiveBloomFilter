const INITIAL_SIZE = 100;
const NUMBER_OF_INSERTIONS = 5;
const PRIME = 691;

BloomFilter = class BloomFilter {
  constructor({name, size = INITIAL_SIZE}) {
    this.name = name;
    this.dep = new Tracker.Dependency;
    this.filter = [];

    for (let i = 0; i < size; i++) {
      this.filter.push(0);
    }
  }

  insert(word) {
    const hash = murmurhash2_32_gc(word);
    const size = this.filter.length;

    for (let i = 0; i < NUMBER_OF_INSERTIONS; i++) {
      let position = (hash % (i * PRIME)) % size;
      this.filter[position] = 1;
    }
    
    this.dep.changed();
  }
  
  insertAll(words) {
    words.forEach(word => this.insert(word));
  }

  check(items) {
    if (Tracker.active)
      this.dep.depend();

    return items.map((i) => {
      const hash = murmurhash2_32_gc(i);
      const size = this.filter.length;
      let isIn = true;

      for (let i = 0; i < NUMBER_OF_INSERTIONS; i++) {
        let position = (hash % (i * PRIME)) % size;
        isIn = isIn && this.filter[position] === 1;
      }

      return {
        key: i,
        'in': isIn
      }
    });
  }
};
