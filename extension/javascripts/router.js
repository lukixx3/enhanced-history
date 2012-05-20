// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BH.Router = (function(_super) {

    __extends(Router, _super);

    Router.name = 'Router';

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'settings': 'settings',
      'search/*query': 'search',
      'weeks/:id': 'week',
      'weeks/:weekId/days/:id': 'day'
    };

    Router.prototype.selectedClass = 'selected';

    Router.prototype.initialize = function() {
      window.settings = new BH.Models.Settings();
      window.version = new BH.Models.Version({
        version: '1.6.0'
      });
      window.appView = this.app = new BH.Views.AppView({
        el: $('.app'),
        model: version,
        collection: new BH.Collections.Weeks([
          {
            date: moment().past('Monday', 0)
          }, {
            date: moment().past('Monday', 1)
          }, {
            date: moment().past('Monday', 2)
          }, {
            date: moment().past('Monday', 3)
          }, {
            date: moment().past('Monday', 4)
          }, {
            date: moment().past('Monday', 5)
          }, {
            date: moment().past('Monday', 6)
          }, {
            date: moment().past('Monday', 7)
          }, {
            date: moment().past('Monday', 8)
          }, {
            date: moment().past('Monday', 9)
          }
        ])
      }).render();
      return Backbone.history.start();
    };

    Router.prototype.week = function(id) {
      var model, view;
      model = this.app.collection.get(id);
      view = this.app.views.weeks[model.id];
      $('.mainview > *').removeClass(this.selectedClass);
      Helpers.pageTitle(model.get('title'));
      view.$el.addClass(this.selectedClass);
      return model.fetch();
    };

    Router.prototype.day = function(weekId, id) {
      var dayView, model, view,
        _this = this;
      model = this.app.collection.get(weekId).get('days').get(id);
      view = this.app.views.weeks[this.app.collection.get(weekId).id];
      view.$el.addClass(this.selectedClass);
      dayView = new BH.Views.DayView({
        model: model
      }, this.app.options);
      $('body').append(dayView.render().el);
      dayView.bind('close', function() {
        return _this.navigate(BH.Lib.Url.week(weekId));
      });
      dayView.open();
      return model.fetch();
    };

    Router.prototype.settings = function() {
      $('.mainview > *').removeClass(this.selectedClass);
      Helpers.pageTitle(chrome.i18n.getMessage('settings_title'));
      return this.app.views.settings.$el.addClass(this.selectedClass);
    };

    Router.prototype.search = function(query) {
      $('.mainview > *').removeClass(this.selectedClass);
      this.app.views.search.$el.addClass(this.selectedClass);
      return this.app.views.search.model.set({
        query: query
      });
    };

    return Router;

  })(Backbone.Router);

}).call(this);
