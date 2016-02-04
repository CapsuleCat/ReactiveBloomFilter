Package.describe({
  name: 'capsulecat:reactive-bloom-filter',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Client side reactive bloom filters',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/CapsuleCat/ReactiveBloomFilter.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('murmur.js');
  api.addFiles('reactive-bloom-filter.js');
  api.export(['BloomFilter']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('capsulecat:reactive-bloom-filter');
  api.addFiles('reactive-bloom-filter-tests.js');
});
