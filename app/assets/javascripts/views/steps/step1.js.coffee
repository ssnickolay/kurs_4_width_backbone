class Sv.Views.StepsStep1 extends Backbone.View
  template: JST['steps/index']
  template_buttons: JST['steps/step1_buttons']

  el: 'body'


  initialize: (attr) ->
    this.model.on('change', this.render, this);
    @columns_index = attr.columns_index


  render: ->
    center_width = @collection.getSumCenterWidth('fake', 0)
    main_width = @collection.findByTreeId().get('width') # ширина колонки в которую они помещены
    not_delete_column = @collection.getNotDeleteCenterCount() - 1 # 3 колонки, 2 маргина...

    if(@model.flag_margin) #если флаг смены ширины true
       @setNewMargin(@collection.margin) # ставим новый маргин
    else
       showPossibleMargin((main_width - center_width)/not_delete_column) # маргин_новый
    @collection.findByType('total').set({'width': not_delete_column * @collection.margin  + center_width})
    #$(@model.column_id).parent().width(not_delete_column * @collection.margin  + center_width) #новая ширина центра. Это родительский div у редактируемого колумна



  events:
    'keyup .normal_field': 'updateWidth' # Событие на "отжатие" клавиши в поле #box1 > :input
    'click .normal_field': 'updateWidth2' # Событие на "нажатие" клавиши в поле #box1 > :input
    'click .plus' : 'divideWidget' # Деление блока на 3 части вертикально
    'click .plus2': 'divideWidgetHorizontally' # Деление блока на 3 части вертикально
    'click .focus' : 'updateTreeRoot' # рассматриваем другое "поддерево"
    #'click .action_buttons' : 'updateTreeRoot' # рассматриваем другое "поддерево"




  updateWidth: (event) ->
    element = $(event.target)
    value = parseInt(element[0].value)
    id = element.attr('id')
    return if(isNaN(value))

    md = @model
    setTimeout ( ->
      md.set({'id': id, 'value' : value})
    ), 300 #пробуем сохранить c задержкой, для удобства


  updateWidth2: (event) ->
    id = $(event.target).attr('id')

    return if id == 'marg' or id == 'total' # при клике по маргину не нужно подсветку делать
    $('.change_column').removeClass('change_column')
    $(@collection.findByType(id).get('id')).find('.widget').addClass('change_column')
    @updateWidth (event)





  setNewMargin: (value) -> #установить новый маргин
    columns_not_delete = @collection.where({'delete_' : 0, 'root_id' : @collection.now_root})
    for column in columns_not_delete when column.get('type') isnt 'left' #всем, кроме левого, добавить маргин
      $(column.get('id')).css({'margin-left':value})


  showPossibleMargin= (value) ->#показать возможный маргин
    $('.help_p > span').text(parseInt(value))


  divideWidget: (event) ->
    @updateTreeRoot(event)

    if(confirm('Данна область будет очищена и разделена?'))
      element = $(event.target)
      widget = element.parent().parent().parent()
      id = widget.attr('id') #id = column_left_1
      root_id = @collection.findById("#"+widget.parent().attr('id')).get('node_id')
      width = widget.width()
      maxNodeId = @collection.getMaxNodeId() + 1 #cледующая запись (новый nodeId)

      widget.removeClass('widget color-blue normal_widget').addClass('box_columns').empty() # это больше не область, а набор областей

      if (@collection.findById("#"+id)?) # если колонка уже была
        @collection.findById("#"+id).set('delete_':0)
        maxNodeId = @collection.findById("#"+id).get('node_id')
        @collection.findById("#"+id).set({'width':width, 'delete_':0, 'root_id':root_id, 'margin':0})


      else #если не существует такой
        @collection.add(new Sv.Models.Column({"id":"#"+id, "nickname":"Левая Колонка","width":width, 'delete_':0, 'type':'main', 'node_id': maxNodeId, 'root_id':root_id, 'margin':0})) #родительская

      @collection.add(new Sv.Models.Column({"id": "#central_"+id, "width":width, 'type':'total', 'node_id': maxNodeId + 1,'root_id':maxNodeId})) #Центральная-общая

      @collection.add(new Sv.Models.Column({"id":"#column_left_"+maxNodeId+'_1', "nickname":"Левая Колонка","width":parseInt(width/3),  'delete_':0, 'type':'left',  'node_id': maxNodeId + 2, 'root_id':maxNodeId}))
      @collection.add(new Sv.Models.Column({"id":"#column_center_"+maxNodeId+'_2', "nickname":"Левая Колонка","width":parseInt(width/3),  'delete_':0, 'type':'center', 'node_id': maxNodeId + 3, 'root_id':maxNodeId}))
      @collection.add(new Sv.Models.Column({"id":"#column_right_"+maxNodeId+'_3', "nickname":"Левая Колонка","width":parseInt(width/3),  'delete_':0, 'type':'right', 'node_id': maxNodeId + 4, 'root_id':maxNodeId}))

      types = ["null", "left" , "center", "right"]
      for i in [1..3] # Добавляем в верстку
        $('<div id ="column_'+types[i]+'_'+maxNodeId+'_'+i+'" class="column"><div class="widget color-blue normal_widget">'+@template_buttons()+'</div></div>').appendTo(widget).width(parseInt(width/3))

      widget.find('.column').wrapAll('<div id = "central_'+id+'" class = "align_center"></div>')






  divideWidgetHorizontally: (event) ->
    if(confirm('Добавить блок ниже?'))
      element = $(event.target)
#      element.addClass('KolOo')
      element = element.parent() while !element.hasClass('widget')
      #type = element.attr('id').split('_')[1]
      #maxNodeId = @collection.getMaxNodeId() + 1 # id = "column_'+ type + '_'+ maxNodeId + '"
      element.after('<div class="widget color-blue normal_widget">'+@template_buttons()+'</div>')



  updateTreeRoot: (event) ->
    element = $(event.target)
    element = element.parent() while !element.hasClass('column')

    #alert("#"+element.attr('id'))
    root_id = @collection.findById("#"+element.attr('id')).get('root_id')
    @collection.findByTreeId().margin = @collection.margin #сохраняем значение в корне действий
    @collection.now_root = root_id #cтавим новый rootId
    @collection.margin = @collection.findByTreeId().get('margin') #cтавим новый rootId
    @columns_index.setValueToInput(root_id) # выставляем значения в поля input
    @render() # что бы возможный маргин выставился






#
