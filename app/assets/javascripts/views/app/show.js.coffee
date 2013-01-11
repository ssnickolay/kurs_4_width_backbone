class Sv.Views.AppShow extends Backbone.View
  template: JST['app/error']

  el: "#message"

  showError: (text) ->
    $(@el).html(@template(text_error:text))
