var Tweet = Application.Model.extend({
  parse: function(data) {
    var entities = data.entities,
        byIndex = [];

    // Flatten the entities structure (for the items we support)
    _.each(entities.hashtags, function(tag) {
      tag.type = 'hash';
      byIndex.push(tag);
    });
    _.each(entities.urls, function(tag) {
      tag.type = 'link';
      byIndex.push(tag);
    });

    byIndex = _.filter(byIndex, function(entity) { return !!entity.indices; });

    // Work backwards so we don't have to screw with index updates
    byIndex.sort(function(a, b) {
      return b.indices[1] - a.indices[1];
    });

    // Merge the text content with the entities
    var ret = [],
        text = data.text;
    _.each(byIndex, function(entity) {
      var start = entity.indices[0],
          end = entity.indices[1],

          // Extract the components from the string
          before = text.substring(0, start),
          entityText = text.substring(start, end),
          after = text.substring(end);

      // Output
      if (after) {
        ret.unshift({text: after});
      }
      entity.text = entityText;
      ret.unshift(entity);

      text = before;
    });
    if (text) {
      ret.unshift({text: text});
    }

    data.display = ret;
    return data;
  }
});
