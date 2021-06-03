"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

createCards(colors);

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const card = document.createElement("div"); // creating a div DOM element for every color
    card.classList.add(color, "card"); // giving each card a class with the value of the color
    card.setAttribute("data-color", [color]); // set card element's data-color attribute to the value of the color
    card.addEventListener("click", handleCardClick); // adding click listener for each card 
    gameBoard.append(card); // appending the div (card) elements to the DOM
  }
}

/* variables to keep track of the cards flipped and a stopper to prevent clicking more than 2 cards */

let clickedTwice = false;
let hasFlipped = false;
let firstCard, secondCard;

/** Flip a card face-up. */

function flipCard(card) {
  if (clickedTwice) return; // return from the function if clickedTwice is true so a third card doesn't get flipped
  if (card === firstCard) return; // prevent clicking on same card twice

  if (!hasFlipped){ // if !hasFlipped === true, means hasFlipped is false, signaling the first time card was clicked
    hasFlipped = true; // set hasFlippedCard to true, signaling a card has been flipped before
    firstCard = card; // set this card to firstCard, will be our memory card
    return; // exit the function
  } else { // otherwise, hasFlipped is true, meaning a card has been flipped before, so this is the second card flipped
    hasFlipped = false; // set hasFlippedCard back to false;
    secondCard = card; // set this card to secondCard 

    checkForMatch(); // call the function checkForMatch to check if firstCard and secondCard is a match
  }
}

/* Reset the variables after each round */

function resetBoard(){
  firstCard = undefined;
  secondCard = undefined;
  clickedTwice = false;
  hasFlipped = false;
} 

/* Check if flipped cards are a match */

function checkForMatch(){
  if (firstCard.dataset.color === secondCard.dataset.color){ // if their data-color attribute value is a match
    firstCard.removeEventListener("click", handleCardClick); // remove ability to click on the card again
    secondCard.removeEventListener("click", handleCardClick);
    resetBoard(); // reset the variables 
    return; // exit the function
  } else { // it's not a match
    unFlipCard(firstCard); // unflip the cards by calling the unFlipCard function
    unFlipCard(secondCard);
  }
}


/** Flip a card face-down. The flipped cards were not a match*/ 

function unFlipCard(card) {
  clickedTwice = true; // lock the board to prevent a third card from being clicked 

  setTimeout(function(){
    card.classList.remove("flipped"); // remove the class of flipped
    card.style.backgroundColor = "white" 
    clickedTwice = false; // unlock the board after cards have been flipped back to face-down
    resetBoard(); // reset the variables
  }, 1000);
}

/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(evt) {
  // ... you need to write this ...
  if (!clickedTwice){ // if clickedTwice is false, meaning no more than 2 cards have been clicked
    let currentCard = this; // set the clicked card to the variable currentCard
    currentCard.classList.add("flipped"); // add a class of flipped to currentCard
    currentCard.style.backgroundColor = currentCard.classList[0]; // change currentCard's background color to be the color of the class it has
    flipCard(currentCard); // call the function flipCard on current card after max of 2 cards have been flipped to see if there's a match
  }
}