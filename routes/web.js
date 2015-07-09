var express         = require('express')
    ,async          = require('async')
    ,router         = express.Router();

var homepage        = require('./controllers/homepage')

/*** Public Routes ***/

    // Public home route. Is a page
    router.get('/', function(req, res) {
        async.parallel(homepage, function(err, results){
            res.render('public/index.html', {
                posts: results.posts
            });
        });
    });

    // Category Home. Is a page. Need to write a next() route for categories that don't exist
    router.get('/:category_name', function(req, res) {
        res.render('public/' + process.env.theme + '/index.html', {})
    });

    // Article Pages. Is a page. Need to write a next() route for pages that don't exist
    router.get('/:post_name/:post_id', function(req, res) {
        res.render('public/' + process.env.theme + '/post.html', {})
    });

    router.use(function(req, res) {
        res.render('status/404', {});
    });


module.exports = router;
