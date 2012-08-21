var SearchResults = Application.Collection.extend({
  model: Tweet,

  url: function() {
    return '/search.json?rpp=5&include_entities=true&result_type=mixed&q=' + encodeURIComponent(this.term);
  },

  parse: function(data) {
    return data.results;
  }
});
