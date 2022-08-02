import React, { Component } from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';




class DishdetailComponent extends Component {


    renderDish(dish){
        if(dish!=null){
          return(
            <div className='row'>
            <div className='col-12 col-md-5 m-1'>
          <Card key={dish.id} >
                    
          <CardImg top object src={dish.image} alt={dish.name} />
          
          <CardBody >
            <CardTitle>{dish.name}</CardTitle> 
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
        </div>
        <div className='col-12 col-md-5 m-1'>
        {this.props.dish.comments.map((commentp)=>{
        return(
            <div key={commentp.id}>
            <h5>{commentp.comment}</h5>
            <p>--{commentp.author}, {commentp.date}</p>
            </div>
        )

    })
    }    
        </div>
        </div>)
        }else{
          return (<div></div>)
        }
      }
    render(){

    return(
            <div>
            {this.renderDish(this.props.dish)}
            </div>
     )
    }
    
}

export default DishdetailComponent;