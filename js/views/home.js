var HomeView = Application.View.extend({
  name: 'home',

  events: {
    'click [data-hash]': function(event) {
      event.preventDefault();

      var hash = event.currentTarget.getAttribute('data-hash');
      this.$('[name="term"]').val(hash)
      this.collection.term = hash;
      this.collection.fetch({resetQueue: true});
    },
    'submit form': function(event) {
      event.preventDefault();

      this.collection.term = this.$('[name="term"]').val();
      this.collection.fetch({resetQueue: true});
    }
  },

  itemContext: function(item) {
    var attr = item.attributes;

    return _.defaults({
      text: new Handlebars.SafeString(_.reduce(attr.display, function(left, entry) {
        var text = Handlebars.Utils.escapeExpression(entry.display_url || entry.text);
        if (entry.type === 'link') {
          text = '<a href="' + entry.url + '">' + text + '</a>';
        } else if (entry.type === 'hash') {
          text = '<a data-hash="' + entry.text + '" href="#">' + text + '</a>';
        }

        return left + text;
      }, ''))
    }, attr);
  }
});
