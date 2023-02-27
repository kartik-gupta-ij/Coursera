var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var Favorites = require('../models/favorite');
router.use(bodyParser.json());
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate('user')
      .populate('dishes')
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite == null) {
          const dishes = []
          for (var i = (req.body.dishes.length - 1); i >= 0; i--) {
            if (dishes.indexOf(req.body.dishes[i]) == -1) {
              dishes.push(req.body.dishes[i])
            }
          }
          Favorites.create({ user: req.user._id, dishes: dishes })
            .then((favorite) => {
              Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favorite);
                })
            })
            .catch((err) => {
              return next(err);
            });
        }
        else {
          for (var i = (req.body.dishes.length - 1); i >= 0; i--) {
            if (favorite.dishes.indexOf(req.body.dishes[i]) == -1) {
              favorite.dishes.push(req.body.dishes[i])
            }
          }
          favorite.save()
            .then((favorite) => {
              Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favorite);
                })
            })
            .catch((err) => {
              return next(err);
            });
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndDelete({ user: req.user._id })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported ');
  })
favoritesRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorites) => {
        if (!favorites) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({ "exists": false, "favorites": favorites });
        }
        else {
          if (favorites.dishes.indexOf(req.params.dishId) < 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({ "exists": false, "favorites": favorites });
          }
          else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({ "exists": true, "favorites": favorites });
          }
        }

      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite == null) {
          Favorites.create({ user: req.user._id, dishes: [req.params.dishId] })
            .then((favorite) => {
              Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favorite);
                })
            })
            .catch((err) => {
              return next(err);
            });
        }
        else {
          if (favorite.dishes.indexOf(req.params.dishId) == -1) {
            favorite.dishes.push(req.params.dishId)
            favorite.save()
              .then((favorite) => {
                Favorites.findById(favorite._id)
                  .populate('user')
                  .populate('dishes')
                  .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                  })
              })
              .catch((err) => {
                return next(err);
              });
          }
          else {
            var err = new Error('Already There');
            err.status = 500;
            next(err);
          }
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .delete(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite == null) {
          var err = new Error('Nothing in Favorites');
          err.status = 500;
          next(err);
        }
        else {
          if (favorite.dishes.indexOf(req.params.dishId) == -1) {
            var err = new Error('Not Present in Favorites');
            err.status = 500;
            next(err);
          }
          else {
            favorite.dishes.splice(favorite.dishes.indexOf(req.params.dishId), 1)
            favorite.save()
              .then((favorite) => {
                Favorites.findById(favorite._id)
                  .populate('user')
                  .populate('dishes')
                  .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                  })
              })
              .catch((err) => {
                return next(err);
              });
          }
        }
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported ');
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('get operation not supported ');
  })


module.exports = favoritesRouter;
