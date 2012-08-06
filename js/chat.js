var Chat = module.exports = {
	users: []
    , rooms: []
	
	,hasUser: function(nick) {
		var users = this.users.filter(function(e) {
			return (e === nick);
		});
		
		if(users.length > 0)
			return true;
		else
			return false;

	}

	, addUser: function(nick) {
		this.users.push(nick);
	}

    , hasRoom : function(roomName) {
        var rooms = this.rooms.filter(function(e) {
            return (e.name === roomName);
        });

        if(rooms.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    , addRoom : function(roomName) {

        this.rooms.push({name:roomName, attendants:[]});

    }

    , getRoomList : function() {
        return this.rooms.map(function(e) {
            return e.name;
        });
    }

}
