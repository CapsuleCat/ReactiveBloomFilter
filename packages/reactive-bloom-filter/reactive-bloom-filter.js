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

  insert(item) {
    let s = item;
    
    if (typeof s !== 'string') {
      s = JSON.stringify(item);
    }
    
    const hash = murmurhash2_32_gc(s);
    const size = this.filter.length;

    for (let i = 0; i < NUMBER_OF_INSERTIONS; i++) {
      let position = (hash % (i * PRIME)) % size;
      this.filter[position] = 1;
    }
    
    this.dep.changed();
  }
  
  insertAll(items) {
    items.forEach(item => this.insert(item));
  }

  check(item) {
    if (Tracker.active)
      this.dep.depend();
      
    let s = item;
    
    if (typeof s !== 'string') {
      s = JSON.stringify(item);
    }
    
    const hash = murmurhash2_32_gc(s);
    const size = this.filter.length;
    let isIn = true;

    for (let i = 0; i < NUMBER_OF_INSERTIONS; i++) {
      let position = (hash % (i * PRIME)) % size;
      isIn = isIn && this.filter[position] === 1;
    }

    return {
      key: item,
      'in': isIn
    };
  },

  checkAll(items) {
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
  
  stringify() {
    return JSON.stringify({
      name: this.name,
      filter: this.filter
    });
  }
};

BloomFilter.fromString = function (s) {
  let json = JSON.parse(s);
  let bloom = new BloomFilter(json.name, json.filter.length);
  bloom.filter = json.filter;
  
  return bloom;
}
