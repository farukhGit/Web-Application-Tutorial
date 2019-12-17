module.exports.posts = function(req, res){
    console.log('welcome to posts controller.');
    return res.send('<h1>Your Post is here</h1>');
}