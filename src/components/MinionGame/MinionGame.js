import React from 'react';  
import HomeScreen from "../HomeScreen/HomeScreen";
import Card from "../Card/Card";

var _ = require('lodash');
const uniqueCards = ['pig','fish','cactus','corn','shroom','bread','mad'];
const numCardsToMatch = 2;

class MemoryGame extends React.Component{
  constructor(){
		super();
		this.shuffleCards = this.shuffleCards.bind(this);
    this.pickCard = this.pickCard.bind(this);
   
    this.ignoreCardClicks = false;
    
		this.state = { 
      cards : [],
      selectedCards: [],
      gameOver: 1
    };

	}
  
  multiplyCards(cards,multiplier){
    let loopTimes = multiplier - 1;
    let multiplied = cards;
    for (var i = 0; i < loopTimes; i++){
      multiplied = _.concat(multiplied,cards);
    }
    
    return multiplied;
  }
  
  shuffleCards(){
   
    let multipliedCards = this.multiplyCards(uniqueCards,numCardsToMatch);
    let shuffled = _.shuffle(multipliedCards);
    
    let cards = shuffled.map(function(val){
      return {
        type: val,
        position: 'unselected'
      }
    });
    
    this.setState({ 
      cards: cards,
      gameOver: 0
    });
    
  }
  
  changeAllPositionsOfSelected(allCards,selectedCards,newPosition){
    for (var v of selectedCards) {
      allCards[v].position=newPosition;
    }
    return allCards;
  }
  
  selectedHasSameAttribute(allCards,selectedCards,attribute){
    let eq = allCards[selectedCards[0]][attribute];
    for (var v of selectedCards) {
      if(allCards[v][attribute] !== eq){ return false; }
    }
    return true;
  }
  
  
  checkForMatch(curCards, curSelectedCards){
     if( this.selectedHasSameAttribute(curCards,curSelectedCards,'type') ){
        curCards = this.changeAllPositionsOfSelected(curCards,curSelectedCards);

       let winTest =  _.reduce(curCards, function(result, value, key) {
         
          if(result === value.position){
            return result;
          }else{
            return false;
          }
          
        }, curCards[0].position); 
       
      }else{
        curCards = this.changeAllPositionsOfSelected(curCards,curSelectedCards,"unselected");
      }
    
      return curCards;
  }

  pickCard(index){
   
    if(this.ignoreCardClicks !== true){

      let curSelectedCards = _.concat(this.state.selectedCards, index);
      let curCards = this.state.cards;


      curCards[curSelectedCards[ curSelectedCards.length-1 ]].position="selected";

      if(curSelectedCards.length === numCardsToMatch){

          this.setState({
            cards: curCards
          })

        let _this = this;
        this.ignoreCardClicks = true;

        let pauseGame = setTimeout(function(){ 
          curCards = _this.checkForMatch(curCards, curSelectedCards);
          curSelectedCards = [];

          _this.ignoreCardClicks = false;

          _this.setState({
            selectedCards: curSelectedCards,
            cards: curCards
          })

        }, 750);

      }else{
        curCards[curSelectedCards[0]].position="selected";

          this.setState({
            selectedCards: curSelectedCards,
            cards: curCards
          })

      }

    }


  }
  
  render(){ 
     let clickEvent = this.pickCard;
    let cardIndex = 0;
     return(
     <div className="memory-app">

       <HomeScreen gameOver={this.state.gameOver} gamesWon={this.state.gamesWon} clickEvent={this.shuffleCards} />
       <div className="cards">
           {this.state.cards.map(function(thisCard) {
            return <Card index={cardIndex++} clickEvent={clickEvent} position={thisCard.position} type={thisCard.type}/>
            })}
       </div> 

      </div>
     )
  }
}


export default function MinionGame() {

   return(
    <MemoryGame />
   )
   
}