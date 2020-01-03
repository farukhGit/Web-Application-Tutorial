module.exports.posts = function(req, res){
    console.log('welcome to posts controller.');
    return res.render('posts', {
        title: 'Posts'
    });
}