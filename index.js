

var dealerSum = 0;
var playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;
let deck;

let canHit = true;


window.onload = function() 
{
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck()
{
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    deck = [];

    for(let i = 0; i < types.length; i++)
    {
        for(let j = 0; j < values.length; j++)
        {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck()
{
    for(let i = 0; i < deck.length; i++)
    {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame()
{
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
   
    while(dealerSum < 17)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for(let i = 0; i < 2; i++)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);  
    }


    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("reset").addEventListener("click", restart);
}

function restart()
{
    location.reload();
}

function stay()
{
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;

    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = ""

    if(playerSum > 21)
    {
        message = "Duhas";
    }
    else if(playerSum < dealerSum)
    {
        message = "Looseris";
    }
    else if (playerSum == dealerSum)
    {
        message = "Lygios";
    }
    else
    {
        message = "Laimejai"
    }

    document.getElementById("result").textContent = message;
}

function hit()
{
    if(!canHit)
    {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();

    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg); 
    
    if(reduceAce(playerSum, playerAceCount) >= 21)
    {
        canHit = false;
        stay();
    }
}

function getValue(card)
{
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value))
    {
        if(value == "A")
        {
            return 11;
        }
        else
        {
            return 10;
        }
    }

    return parseInt(value);
}

function checkAce(card)
{
    if(card[0] == "A")
    {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount)
{
    while(playerSum > 21 && playerAceCount > 0)
    {
    playerSum -= 10;
    playerAceCount -= 1;
    }
    return playerSum;

}