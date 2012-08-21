var HomeView = Application.View.extend({
  name: 'home',

  events: {
    'submit form': function(event) {
      event.preventDefault();

      this.collection.term = this.$('[name="term"]').val();
      this.collection.fetch({resetQueue: true});
    }
  }
});
