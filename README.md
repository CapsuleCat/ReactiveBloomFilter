# Reactive Bloom Filters
Reactive client side bloom filters for Meteor.

## Usage

```js
// Create a Bloom Filter:
Words = new BloomFilter({
    name: 'words',
    size: 100 // Optional and defaults to 100
});

// Insert some words into it
Words.insert('bloom');
Words.insert('filter');
```

You can use the Bloom Filter similarly to how you would use a Mongo Collection:

```js
// Bind the Bloom Filter to items
Template.list.helpers({
    items: function () {
        return Words.check(['test']);
    }
});
```

`.check(Array<String>)` return an array of objects with a key and an `in` value:

```js
Words.check(['test']) === [
    {
        'key': 'test',
        'in': true
    }
]
```
