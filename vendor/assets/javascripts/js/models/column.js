$(function () {

var Column = Backbone.Model.extend({
    defaults: {
		index: 0,
        id: "#left",
        nickname: "",
		width: "",
		left: 12,
		delete_: 0,
		margin:""
    },
	 
	initialize: function(index, id, nickname, width, left, delete_, margin) {
		this.set({"index": index});//this.index = index; 
		this.set({"id": id});//this.index = index; 
		this.set({"nickname": nickname});//this.nickname = nickname; 
		this.set({"width": width});//this.width = width; 
		this.set({"left": left});//this.left = left; 
		this.set({"delete_": delete_});//this.delete_ = delete_; 
		this.set({"margin": margin});//this.margin = margin; 
	}
});

 var ColumnsCollection = Backbone.Collection.extend({ // Коллекция пользователей
        model: Column,
		checkUser: function (username) { // Проверка пользователя
            return findResult = this.find(function (user){ if (user.get("nickname") == username) return user; })
			
        }
    });

var columns = new ColumnsCollection();

c = new Column(1, "#1", "Kolqa1", "Kolqa1", "Kolqa1", "Kolqa1", "Kolqa1");
//alert(c.get("nickname"));
columns.add(c);
d = new Column(2, "#2", "Kolqa2", "Kolqa2", "Kolqa2", "Kolqa2", "Kolqa2");
columns.add(d);
dd = columns.checkUser("Kolqa1").get("id");
alert(dd);
});