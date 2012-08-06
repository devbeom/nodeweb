/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
  
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret:'secret key'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
// GET
app.get('/', routes.index);
app.get('/join', routes.form);
app.get('/member', routes.member);
app.get('/stage', routes.stage);
app.get('/ball', routes.ball);
app.get('/board', routes.board_list);
app.get('/ui', routes.ui);
app.get('/chat_main', routes.chat_main);
app.get('/chat_RoomIn/:id', routes.chat_RoomIn);
app.get('/session_test',routes.session_get);
app.get('/iframe', routes.ifrm);
app.get('/postit', routes.postit);
//app.get('/chat',

// POST
app.post('/join', routes.join);
app.post('/chat_enter', routes.chat_enter);
app.post('/chat_roomMake', routes.chat_roomMake);
app.post('/session_test', routes.session_post);
app.post('/board_insert', routes.board_insert);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  //1234
});
