if (Meteor.isClient) {
  // Create a Bloom Filter
  Words = new BloomFilter({name:'words'});

  // Insert some words into it
  Words.insert('bloom');
  Words.insert('filter');

  // Have some words to check
  let wordsToCheck = [
    'this',
    'is',
    'a',
    'simple',
    'bloom',
    'filter',
    'test'
  ];

  // Bind the Bloom Filter to items
  Template.list.helpers({
    items: function () {
      return Words.check(wordsToCheck);
    }
  });

  // Add an event to add words to the bloom filter
  Template.add.events({
    'submit form': function (e) {
      e.preventDefault();

      let value = $('input').val();

      if (wordsToCheck.indexOf(value) === -1)
        wordsToCheck.push(value);
      Words.insert(value);
    }
  });
}
