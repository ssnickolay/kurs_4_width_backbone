class Sv.Views.AppsApp extends Backbone.View
  el: 'body'
  template: JST['steps/step1_buttons']

  initialize: (attr) ->
    @step1_view = attr.step1_view


  events:
    'click .remove': 'deleteWidget'# Событие на удаление области\блока


  deleteWidget:(event) ->
    element = $(event.target)
    @step1_view.updateTreeRoot(event)

    $column = element.parent().parent().parent().parent()
    id_column = $column.attr('id')
    type = id_column.split('_')[1] # id_column = column_left, type = left

    #@collection.where({'type' : id_column.split('_')[1], 'root_id' : @collection.now_root})[0]

    count = $column.find('.widget').size()

    flag = false
    if(count == 1)
		   if(confirm('Удалить колонку навсегда?'))
			    $column.animate(opacity: 0,->$(this).remove())
			    flag = true #принять меры если удалена колонка

    if(flag and @collection.findByType(type).get('node_id')?) #если удаленная колонка из дерева
      column_width = @collection.findByType(type).get('width') #размер освободившейся области
      column_not_delete = @collection.getNotDeleteCenterCount() - 1 #кол-во неудаленных в центре блоков

      width_plus = parseInt(column_width/column_not_delete)
      column_mass = @collection.where({'delete_' : 0, 'root_id' : @collection.now_root}) #все в центре, неудаленные

      if($column.parent().find('.column').size() == 2) #осталась 1 колонка - нужна реструктуризация
        widget = element
        widget = widget.parent() while !widget.hasClass('box_columns')
        type_delete = widget.find('.column').attr('id').split('_')[1]
        @collection.remove(@collection.findByType(type_delete).set({'delete_':1})) # удалить вторую колонку
        @collection.remove(@collection.findByType(type).set({'delete_':1})) # удалить первую колонку
        @collection.remove(@collection.findByType('total').set({'delete_':1})) # удалить центральную
        widget.addClass('widget color-blue normal_widget').removeClass('box_columns').empty().append(@template()).find('.focus').click()
      else
        $("#"+type)[0].value = 0 # ширина удаленной  = 0
        #$("#"+type)[0].click() # ввести изменения в силу
        for column_this in column_mass when column_this.get('id') isnt "#"+id_column
          input_id = column_this.get('id').split('_')[1] #соотношение name = column_left, id = left
          $("#"+input_id)[0].value = parseInt($("#"+input_id)[0].value) + width_plus # new = old + new
          $("#"+input_id).click() # генерируем клик, что бы отработали изменения
        @collection.remove(@collection.findByType(type).set({'delete_':1})) # удалить ее







      #alert(@collection.findById("#column_right").get('nickname'))
		     #if !@collection.findById(id).get({'center'})
		     #   return
		     #column_not_delete = @collection.getNotDeleteCenterCount()
		     #column_mass = @collection.where({'center' : 1})
		     #for column in column_mass when column.get('id') isnt id
         #   findResult += column.get('width')
