const express = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the Leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all Leaders');
});

promotionsRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the Leader: ' + req.params.leaderId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /Leaders/'+ req.params.leaderId);
})
.put( (req, res, next) => {
  res.write('Updating the Leader: ' + req.params.leaderId + '\n');
  res.end('Will update the Leader: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting Leader: ' + req.params.leaderId);
});
module.exports = promotionsRouter;