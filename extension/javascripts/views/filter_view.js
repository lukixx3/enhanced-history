FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
  },

  render: function() {
    var self = this;
    $('#filterTemplate').tmpl(this.model.toJSON()).appendTo($(this.el));
    $('.spinner').spin();

    $(this.el).fadeIn("fast", function() {
      PageVisit.search(self.model.options(), function(results) {
        $('.content', self.el).fadeOut(200, function() {
          $('.content', self.el).html('');
          if(results.length === 0) {
            $('#noVisitsTemplate').tmpl().appendTo($('.content', self.el));
            self.presentContent();
          } else {
            dateVisits = groupResults(results);
            $.each(dateVisits.models, function(i, dateVisit) {
              var dateVisitView = new DateVisitView({model: dateVisit});
              $('.content', self.el).append(dateVisitView.render().el);
            });
            self.presentContent();
          }
        });
      });
    });
  },

  stickHeaders: function(container) {
    $(container).find('.date_visit_view').stickySectionHeaders({
      stickyClass:'date_interval', padding:48
    });
    $(container).find('.time').stickySectionHeaders({
      stickyClass:'time_interval', padding:48
    });
    $('html, body').animate({scrollTop: 45}, 300);
  },

  dragify: function(selector) {
    $(selector).draggable({
      revert: 'invalid',
      revertDuration: 200,
      helper: 'clone',
      appendTo: 'body',
      handle: '.handle',
      zIndex: 1000
    });
  },

  presentContent: function() {
    var self = this;
    $('.content', self.el).show('slide', {direction:'left'}, 350, function() {
      self.stickHeaders($('.content', self.el));
      self.dragify('.page_visit, .grouped_visits');
    });
  }
});