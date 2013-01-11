class Sv.Routers.Steps extends Backbone.Router
  routes:
    '!/newsite#box3': 'index',
    'box3': 'index2',
    '/newsite#box3': 'index3',
    #'': 'index'

  index: ->
    alert "First step"

  index2: ->
    alert "2 step"

  index3: ->
    alert "3 step"
