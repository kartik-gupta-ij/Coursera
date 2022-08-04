import React from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';


function RenderDish({dish}) {
  return(
    <div className='col-12 col-md-5 m-1'>
      <Card key={dish.id} >
        <CardImg top object src={dish.image} alt={dish.name} />
        <CardBody >
          <CardTitle>{dish.name}</CardTitle> 
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) {
  const Comments =comments.map((commentp)=> {
    return(
      <div key={commentp.id}>
          <h5>{commentp.comment}</h5>
          <p>--{commentp.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(commentp.date))}</p>
      </div>
    );

  });
  return(
    <div className='col-12 col-md-5 m-1'>
      <h4>Comments</h4>
        {Comments}
    </div>
  );
}

const  DishDetail = (props) => {
  if(props.dish!=null){
      return(

        <div className='container'>
          <div className='row'>
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.dish.comments}/>
          </div>
        </div>
    )
  }
  else{
    return (<div></div>)
  }
}


export default DishDetail;