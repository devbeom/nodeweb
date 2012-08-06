
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.session.sesNick);
  	res.render('index', { title: 'Express' })
};

exports.ball = function(req, res){
    res.render('ball-test', { title: 'Express' })
};


exports.form = function(req, res) {
	res.render('join-form', {title : 'Express' });	
};


exports.board_list = function(req, res) {
	res.render('board/board-list', {title : 'Express' });	
};


exports.ui = function(req, res) {
	res.render('ui', {title : 'Express' });	
};


exports.join = function(req, res) {

	var db = require('../db/member');
	
	db.hasNameAndEmail(req.body, function(err, results) {
		if(results.length > 0) {
			console.log('등록된 아이디가 있습니다.');
		}
		else {
			db.insertUser(req.body, function(err, results) {
				if(!err) {
					db.hasNameAndEmail(req.body, function(err, results) {
						res.render('join-result', {
							title:'Express'
							, username:results[0].user_name
							, useremail:results[0].user_email
						});
					});
				}
			});
		}
	});
	
};

exports.member = function(req,res) {

	var db = require('../db/member');

	db.SelectList(req.body, function(err, results) {
		//1234

		res.render('member-list', {
			title: 'Express'
			, arr: results
		});
	});

};

exports.chat_main = function(req,res) {

	var chat = require('../js/chat');


	if(req.session.sesNick)
		res.render('chat/chat_enter', {
			title : 'Express'
			, isSuccss : true
			, nick: req.session.sesNick
			, RoomList : chat.getRoomList()
		});
	else
		res.render('chat/chat_main', {title: 'Express'});
};


exports.chat_enter = function(req,res) {

	var chat = require('../js/chat');
	var isSuccss = false;
	var reqNick = req.body.nick;

	//console.log(reqNick);
	
	if(reqNick && reqNick.trim() !== '') {
		if(!chat.hasUser(reqNick)) {
			chat.addUser(reqNick);
			req.session.sesNick = reqNick;
			isSuccss = true;
		}
	}

	res.render('chat/chat_enter', {
		title : 'Express'
		, isSuccss : isSuccss
		, nick: reqNick
        , RoomList : chat.getRoomList()
	});

	//console.log(chat.users);
};

exports.chat_roomMake = function(req,res) {

    var chat = require('../js/chat');
    var isSuccess = false;
    var roomName = req.body.roomname;

    //console.log(roomName);

    if(roomName && roomName.trim() != '') {
        if(!chat.hasRoom(roomName)) {
            chat.addRoom(roomName);
            isSuccess = true;
        }
    }

    res.render('chat/chat_roomMake',{
        title:'Express'
        , isSuccess:isSuccess
        , roomName: roomName
    });

};

exports.chat_RoomIn = function(req,res) {


	var isBool = false;
	var roomName = req.params.id;


	res.render('chat/chat_inRoom', {
		title:'Express'
		, roomName:roomName
		, userName:req.session.sesNick
	})

};


exports.session_get =  function(req,res) {
	var val = '';

	if(req.session.strValue != '') {
		val = req.session.strValue;
	}
	else {
		val = '';
	}
	res.render('session_test',{
		title: 'Session'
		, sesValue : val
	});
};


exports.session_post =  function(req,res) {

	req.session.strValue = req.body.sesValue;

	res.render('session_test',{
		title: 'Session'
		,sesValue: req.session.strValue

	});

};


exports.ifrm = function(req,res) {
	res.render('iframe', {title:'Express'});
};


exports.board_insert = function(req,res) {
	res.render('board/board-insert', {
		title:'Express'
		, txtTitle: req.body.title
		, txtContent: req.body.ir1
	});
};


exports.postit = function(req, res) {
	
	res.render('postit', {title:'Express'});

};