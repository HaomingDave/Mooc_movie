const express = require('express');
const app =express();
const path=require('path');
const mongoose=require('mongoose');
const _underscore= require('underscore');
const Movie=require('./models/movies.js')
var bodyParser = require('body-parser');
var pug=require('pug');

var port = process.env.PORT||3080

var moment = require('moment');
app.locals.moment = moment;
//connect to mongodb database
mongoose.connect('mongodb://localhost/nodeWeb',{useMongoClient:true});
mongoose.Promise =global.Promise;

app.set('views', path.join(__dirname,"./views/pages"));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }
    res.render('index', {  // 渲染index 首页
      title: 'i_movie 首页',
      movies: movies
    });
  });
});


//detail page
app.get('/movie/:id',function(req,res){
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
      res.render('detail',{
      title:'Imovie'+ movie.title,
      movie:movie
    })
  })
})

// admin page 后台录入页
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
      title: 'i_movie 后台录入页',
      movie: {
          title: '',
          doctor: '',
          country: '',
          year: '',
          poster: '',
          flash: '',
          summary: '',
          language: ''
      }
  });
});

//update page
app.get('/admin/update/:id',function(req,res){
  var id = req.params.id;
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'后台更新页面',
        movie:movie
      })
    })
  }
})

//post
app.post('/admin/movie/new',function(req,res){
  var id = req.body.movie._id;
  var movieObj=req.body.movie;
  var _movie;
  if(id !== 'undefine' && id !==''){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err);
      }

      _movie = _underscore.extend(movie,movieObj)
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/' + movie._id)
      });
    });
  } else{
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    _movie.save(function(err,movie){
      if (err) {
        console.log(err);
    }
    res.redirect('/movie/' + movie._id);

    });
  }
})


app.get('/admin/list',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('list',{
    title:'Imovie List',
    movies:movies
    })
  })
})

app.delete('/admin/list',function(req,res){
  var id=req.query.id
  if(id){
    Movie.remove({_id:id},function(err,movie){
      if (err) {
        console.log(err);
      } else {
        res.json({success: 1});
      }
    })
  }
})


app.listen(3080);
console.log(`start in ${port}`)