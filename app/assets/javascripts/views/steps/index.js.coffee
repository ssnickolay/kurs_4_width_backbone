class Sv.Views.StepsIndex extends Backbone.View

  template: JST['steps/index']

  template_buttons: JST['steps/step1_buttons']

  initialize: (attr) ->
    template = @template_buttons()
    $('.widget').each(->
      $(this).append(template)
    )
