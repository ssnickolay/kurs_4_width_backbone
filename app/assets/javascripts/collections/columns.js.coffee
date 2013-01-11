class Sv.Collections.Columns extends Backbone.Collection

  model: Sv.Models.Column

  margin: 0 #margin текущео редактируемого блока
  now_root: 1 #изначально root - на самом верху

  initialize: ->
    this.add(new Sv.Models.Column({"id":"#main", "nickname":"Сайт","width":1000,  'node_id': 1, 'root_id':0, 'margin':0}))
    this.add(new Sv.Models.Column({"id":"#column_head",   "nickname":"Шапка","width":"", 'node_id':5, 'root_id':1}))
    this.add(new Sv.Models.Column({"id":"#central_columns",  "nickname":"Центральная Колонка", 'type':'total', "width":978, 'root_id':1}))
    this.add(new Sv.Models.Column({"id":"#column_left",   "nickname":"Левая Колонка","width":326,  'delete_':0, 'type':'left', 'node_id': 2, 'root_id':1}))
    this.add(new Sv.Models.Column({"id":"#column_center", "nickname":"Центральная Колонка","width":326, 'delete_':0, 'type':'center', 'node_id': 3, 'root_id':1}))
    this.add(new Sv.Models.Column({"id":"#column_right",  "nickname":"Правая Колонка","width":326, 'delete_':0, 'type':'right', 'node_id': 4, 'root_id':1}))
    this.add(new Sv.Models.Column({"id":"#column_footer", "nickname":"Футер","width":"", 'node_id':6, 'root_id':1}))



  findById: (id) ->   # Поиск в коллекции по id
    return findResult = this.find((column)-> if column.get("id") == id
                                                return column)

  findByTreeId: (node_id) ->  #поис по дереву treeId == nodeId
    node_id = @now_root if !node_id? # без параметра - значит now_root
    return findResult = this.find((column)-> if column.get("node_id") == node_id
                                                return column)

  findByType: (type) ->  #поис по типу
    return @where({'type' : type, 'root_id' : @now_root})[0]


  getNotDeleteCenterCount: -> # Кол-во неудаленных колонок в центре
    return findResult = @where({'delete_' : 0, 'root_id' : @now_root}).length

  getMaxNodeId: ->
    return @max((column)-> return column.get('node_id')).get('node_id')

  getSumCenterWidth: (id, value) -> #Все, кроме id = id
    switch id
      when "marg" then findResult =  (@getNotDeleteCenterCount() - 1) * value #value = new margin
      when "fake" then findResult = 0 #cумма без маргинов (для просщета нового значения)
      else             findResult = value + (@getNotDeleteCenterCount() - 1) * @margin #value = new width

    column_mass = @where({'root_id' : @now_root, 'delete_' : 0}) #выбрать все дочерние

    #findResult -= @findByType('main').get('width') # убрать из рассмотрение общую ширину
    for column in column_mass when column.get('type') isnt id #type для текущего уровня дерева == id
      findResult += column.get('width')
    return findResult



#------------------------------STEP2----------------------------------------------
