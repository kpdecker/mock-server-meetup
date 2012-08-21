module.router({
  index: function() {
    Application.setView(new HomeView({
      collection: new SearchResults()
    }));
  }
});
