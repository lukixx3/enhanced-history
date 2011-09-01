TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time',

  render: function() {
    $('#timeVisitTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    this.renderVisits();
    return this;
  },

  renderVisits: function() {
    var self = this;
    var pageVisits = this.model.get('pageVisits');
    if(pageVisits.length > 0) {
      $.each(pageVisits, function(i, pageVisit) {
        if(pageVisit.length !== undefined) {
          var groupedVisitsView = new GroupedVisitsView({collection: pageVisit});
          $(self.el).append(groupedVisitsView.render().el);
        } else {
          var pageVisitView = new PageVisitView({model: pageVisit});
          $(self.el).append(pageVisitView.render().el);
        }
      });
    }
  }
});