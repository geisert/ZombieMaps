/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
//, db = require('./db-functions')
, express = require('express')
, sio = require('socket.io');

function init(app){

    // Configuration

    console.log("init");
    app.configure(function(){
                      app.set('views', __dirname + '/views');
                      app.set('view engine', 'ejs');
                      app.use(express.bodyParser());
                      app.use(express.methodOverride());
                      app.use(app.router);
                      app.use(express.static(__dirname + '/public'));
                      console.log("dirname:" + __dirname);
                  });

    app.set('view options', {
                layout: "layout.ejs"
            });
    
    app.configure('development', function(){
                      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
                  });

    app.configure('production', function(){
                      app.use(express.errorHandler()); 
                  });


    ///////////////////////////////////////////////////////////
    function contentType(path) {
        if (path.match('.js$')) {
            return "text/javascript";
        } else if (path.match('.css$')) {
            return  "text/css";
        } else if (path.match('.manifest$')) {
            return  "text/cache-manifest";
        } else if (path.match('.svg$')) {   // disabled
            return  "image/svg+xml";
//            return "text/html";
        }  else {
            return "text/html";
        }
    }

    ///////////////////////////////////////////////////////////
    // Util methods

    function extend(destination, source) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function log(str) {
        console.log(str);
    }

    function showPage(req, res, locals) {
        var url = req.url.slice(1); // remove leading
        if (url=="/") { url = "/index"}
        url = url.split("?")[0];    // remove any params for matching
        if (locals == null) {
            locals = {};
        }

        log(locals);
        var pagename = locals.pagename || url;
        if ("showPagename" in locals) { // even if its set to false, use that value
            showPagename = locals.showPagename;
        } else {
            showPagename = true;
        }

        var defaults = {
            nickname: "alphaman",
            pagename: pagename,
            showPagename: showPagename,
            includes: ''
        };
        locals = extend(locals, defaults);
        // log(locals);

        res.render(url, {
                       locals: locals
                   }
                  );
    }

    ///////////////////////////////////////////////////////////
    // Routes

    app.get('/', function(req, res){
                showPage(req, res);
            });

    app.get('/shapes/:shape/:color', function(req, res) {
        var str = shapes.draw(req.params.shape, req.params.color);
        res.contentType(contentType(req.url))
        // res.writeHead(200, {'Content-Type': contentType(req.url)});
        res.send(str);
        // showPage(req,res);
    });

    var liburl = require('url');
    var fs = require('fs');

    app.get('/cache.manifest', function(req,res){
                
                var path = liburl.parse(req.url).pathname;
                log("path=" + path);

                fs.readFile(__dirname + path, function(err, data){
                                if (err) {
                                    res.writeHead(404);
                                    res.write("cant find the manifest!")
                                    res.end();
                                } else {
                                    res.writeHead(200, {'Content-Type': contentType(path)});
                                    res.write(data, 'utf8');
                                    res.end();
                                }
                            });
                // res.contentType("text/cache-manifest");
                // res.end("CACHE MANIFEST");
            });

    ////// catchall/404 handler
    //app.get('*', function(req, res){
    //    str = req.url;
    //    res.send('404!!!<br/>' + str, 404);
    //});
    //

var io = sio.listen(app);
var sockets=[];
var rooms={};
io.sockets.on('connection',function(socket){
   	sockets.push(socket.id);
   	socket.on('toRoom',function(json){
   		action=json.action;
   		delete json.action;
    	io.sockets.emit(action,json);
   	});
   	socket.on('disconnect',function(){
		delete sockets[sockets.indexOf(socket.id)];
		console.log('disconnect');
 	});
});

}

var app = module.exports = express.createServer();
init(app);
app.listen(8005);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
