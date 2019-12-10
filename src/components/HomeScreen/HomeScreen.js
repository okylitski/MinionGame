import React from 'react'

export class HomeScreen extends React.Component{
    constructor(){
           super();
           this.clickMe = this.clickMe.bind(this);
     }
   clickMe(){
      this.props.clickEvent(this.props.clickEvent);
   } 
      render(){ 
        return (
           <div className={this.props.gameOver ? "homescreen homescreen--visible" : "homescreen homescreen--hidden"}>
             <div className="homescreen__box">
               <h1 className="homescreen__title">Minion Game</h1>
               <button className="homescreen__shuffle-button " onClick={this.clickMe} >Start!</button>
            </div>
           </div>
          )
      }
 }

 export default HomeScreen