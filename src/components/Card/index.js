import React from 'react'

export class Card extends React.Component{
    constructor(){
           super();
           this.clickMe = this.clickMe.bind(this);
    }
     clickMe(){
       if(this.props.position === 'unselected'){
         this.props.clickEvent(this.props.index);
       }else{
         console.log('cant click me! my position is '+this.props.position);
       }
       
     }
    
      render(){ 
        return (
          <div data-index={this.props.index} data-cardtype={this.props.type} onClick={this.clickMe } className={ 'card card--'+this.props.type+' card--'+this.props.position } > 
           <div className="card__inner"> 
               <div className="card__face card__front"> 
                 
               </div> 
               <div className="card__face card__back"> 
                  
               </div> 
           </div> 
       </div> 
        ) 
      }
   }
   
   export default Card