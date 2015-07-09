var express         = require('express')
    ,async          = require('async')

var models          = require('./models/schemas')
    ,ObjectId       = require('mongoose').Types.ObjectId

// Async Parallel controllers
var newPost         = require('./controllers/newPost')
    ,newCategory    = require('./controllers/newCategory')
    ,updatePost     = require('./controllers/updatePost')

// General Helpers
var post            = require('./controllers/post')

var router      = express.Router()

/*** Admin Routes ***/

// Admin home route. Note: Hard routes need to stay at the top of the pipeline
router.get('/', function(req, res) {
    models.category.find(function(err, docs) {
        res.render('admin/index', {
            docs: docs
        })
    });
});

// Admin single post. Activate and deactivate. Can creates a page
router.route('/posts/:newOrId')
    .get(function(req, res) {
        if (req.params.newOrId === 'new') {
                async.parallel(newPost, function(err, result){
                    if(err) {
                        console.log(err)
                    } else {
                        res.render('admin/post.html', {
                            id: result.post._id,
                            doc: result
                        })
                    }
                });
        } else {
            // Find one but then do the same extact thing as parallels above
            updatePost.id = req.params.newOrId
            async.parallel(updatePost.exec, function(err, result){
                if(err) {
                    console.log(err)
                } else {
                    res.render('admin/post.html', {
                        doc: result,
                        id: result.post._id
                    })
                }
            });
        }
    })
    .post(function(req, res) {
        // var onePost = post.parsePost(req);
        console.log('hit')
        async.parallel({
            category: function(callback) {
                models.category.findOne({ _id: req.body.category }, function(err, category){
                    callback(null, category);
                });
            },
            user: function(callback) {
                models.user.findOne({ _id: req.body.writtenBy }, function(err, user){
                    callback(null, user)
                });
            }
        }, function(err, result){
            console.log(result)
            var updated = post.parsePost(req.body, result)

            models.post.findOneAndUpdate({
                _id: ObjectId(req.params.newOrId)
            }, updated, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/my')
                }
            });
        });
    });

// Admin all categories. Can create a page
router.route('/categories')
    .get(function(req, res) {
        models.category.find(function(err, docs) {
            res.render('admin/categories.html', {
                docs: docs
            })
        });
    })
    .post(function(req, res) {

    });

// Admin category and its posts. Activate and deactivate. Creates a page
router.route('/categories/:newOrId')
    .get(function(req, res) {
        if(req.params.newOrId === 'new') {
            async.parallel(newCategory, function(err, result){
                res.render('admin/category.html', {
                    doc: result.category,
                    id: result.category._id
                })
            });
        } else {
            models.post.find({'category._id': ObjectId(req.params.newOrId)}, function(err, docs){
                res.render('admin/posts.html', {
                    posts: docs
                })
            });
        }
    })
    .post(function(req, res) {
        models.category.findOneAndUpdate({
                _id: ObjectId(req.params.newOrId)
            }, req.body, function(err, doc){
                if(err) {
                    console.log(err)
                } else {
                    res.redirect('/my')
                }
        });
    });

// Admin 30 posts. Activate and deactivate. Can creates a page
router.route('/posts')
    .get(function(req, res) {
        models.post.find(function(err, docs) {
            res.render('admin/posts.html', {
                posts: docs
            })
        });
    });

// Admin see all users
router.get('/users', function(req, res) {
    console.log(4)
});

// Admin create and update users
router.route('/users/:newOrId')
    .get(function(req, res) {
        console.log(5)
    })
    .post(function(req, res) {

    });

module.exports = router
