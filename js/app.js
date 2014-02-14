App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('products', function() {
    this.resource('product', { 'path' : '/:product_id' }, function() {
      this.route('edit');
    });
  });
});

// products with s
App.Products = DS.Model.extend({
  title: DS.attr('string')
});

App.Products.FIXTURES = [
  { id: 1, title: 'Rube Goldberg Breakfast-o-Matic' }
];

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    // new finder
    return this.store.find('products');
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    // new finder
    return this.store.find('products', params.product_id);
  }
});

App.ProductController = Ember.ObjectController.extend({
  // the initial value of the `search` property
  actions: {
    toProducts: function() {
      this.transitionToRoute('products');
    }
  }
});

App.ProductEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('product');
  }
});

App.ProductEditController = Ember.ObjectController.extend({
  actions: {
    updateProduct: function() {
      var product = this.get('model');
      product.save();
      this.transitionToRoute('product', product);
    }
  }
});
