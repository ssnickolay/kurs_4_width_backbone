class Sv.Models.Step1 extends Backbone.Model

  @collection: null
  @show:null
  @flag_margin: false #редактированили поле margin, а не ширину
  @column_id: "#id"    #id'шник редактированого колумна


  initialize: (attr) ->
    @collection = attr.collection
    @show = attr.show
    this.on('error',  (model, error)-> @printError(model,error)) # если ошибка
    this.on('change', (model, error)-> @printSuccess(model,error)) # если нет ошибки

  validate: (attr) ->
    @flag_margin = false
    @column_id = "sd"
    if(@verifyChildrenWidth(attr.id, attr.value)) # выше уровень не должен быть уже нижних
      if(attr.id == 'total') #ширина сайта не имеет ограничений
        return !@collection.findByTreeId().set({'width' : attr.value})
      if(@collection.getSumCenterWidth(attr.id, attr.value) <= @collection.findByTreeId().get('width'))#новая общая ширина сайта не может быть больше чем текущай ширина сайта
        if(attr.id == 'marg')
          @collection.margin = attr.value
          @flag_margin = true
          @column_id = "#"+$(@collection.findByTreeId().get('id')).find('.central_columns').children().attr('id')#извращение - костыль
          return false
        else
          if @collection.where({'type' : attr.id, 'root_id' : @collection.now_root})[0].set({'width' : attr.value})
            @column_id = @collection.where({'type' : attr.id, 'root_id' : @collection.now_root})[0].get('id')
            return false
      else
        alert(@collection.getSumCenterWidth(attr.id, attr.value))
        alert(@collection.findByTreeId().get('width'))
        return "Ширина центральных колонок и отступов превышает ширину сайта"
    else
      return "Одно из значений ширины вложенных колонок больше задаваемой"


  verifyChildrenWidth: (id, value) -> #id == type
    switch id
      when "total" then this_column = @collection.findByTreeId() # если меняетя Главная, то меняем root
      when "marg"  then return true #если маргин, то не будет коализии ниже-больше
      else this_column = @collection.findByType(id)

    column_mass = @collection.where({'root_id' : this_column.get('node_id'), 'type' : 'total'}) # все дочерние, которые множество колонок (main)
    for column in column_mass
      if value < column.get('width')
        return false # если новое значение родительско уже, чем дочерние в статике
    return true



  printError: (model,error)->
    @show.showError(error)

  printSuccess: (model,error) ->
    @show.showError("Олееее оО Ни какой ошибки!")
