// state variables
let st_running = false
let player_score = 0
let dealer_score = 0
let player_aces = 0
let dealer_aces = 0
let dealer_draws = Array()
let game_end = false
let card

// elements
let controller = document.getElementById("controller")
let player_card_history = document.getElementById("play_card_history")
let dealer_card_history = document.getElementById("deal_card_history")
let player_score_print = document.getElementById("play_score")
let dealer_disp = document.getElementById("deal_disp")
let title = document.getElementById("title")
let btn = document.getElementById("game_button")


let deck = new Array()


function buildDeck() {
    const suits = ["♠️", "♦️", "♣️", "♥️"]
    const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    deck = new Array()
    
    for (let suit of suits) {
        for (let number of numbers) {
            deck.push(number + suit)
        }
    }

    return deck
}


function drawCard() {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let card = deck[randomIndex]
    deck.splice(randomIndex, 1)
    return card
}


function createButton(container) {
    const button = document.createElement('button')

    button.textContent = 'Stand'
    button.id = 'call'

    container.appendChild(button)

    button.addEventListener('click', endgame)

}


function updateScore(card, score, aces) {
    let cardLen = card.length
    let number = card.slice(0, cardLen-2)
    
    if (!isNaN(number)) {
        number = parseInt(number)
    } else {
        if (number === "A") {
            aces += 1
            number = 11
        } else {
            number = 10
        }
    }

    score += number

    while ((score > 21) && (aces > 0)) {
        score -= 10
        aces -= 1
    }

    return [score, aces]
}


function playerDraw(n) {

    while (n > 0) {
        card = drawCard()
        updateCardHist(player_card_history, card)
        const result = updateScore(card, player_score, player_aces)
        player_score = result[0]
        player_aces = result[1]
        player_score_print.textContent = "Score: " + player_score
        n -= 1
    }
}


function dealerDraw(n) {
    while (n > 0) {
        card = drawCard()
        dealer_draws.push(card)
        const result = updateScore(card, dealer_score, dealer_aces)
        dealer_score = result[0]
        dealer_aces = result[1]
        n -= 1
    }
}


async function endgame() {

    game_end = true

    updateCardHist(dealer_card_history, dealer_draws[1])

    while (dealer_score < 17) {
        dealerDraw(1)
        updateCardHist(dealer_card_history, dealer_draws[dealer_draws.length - 1])
    }

    let gameStatus

    if (player_score > 21) {
        if (dealer_score > 21) {
            gameStatus = 'd'
        } else {
            gameStatus = 'b'
        }
    } else {
        if ((player_score > dealer_score) || (dealer_score > 21)) {
            gameStatus = 'w'
        } else if (player_score == dealer_score) {
            gameStatus = 'd'
        } else {
            gameStatus = 'l'
        }
    }

    const dealer_score_print = document.createElement('p')
    dealer_score_print.textContent = 'Score: ' + dealer_score
    dealer_score_print.id = 'dealer_score_print'
    dealer_disp.append(dealer_score_print)

    document.getElementById('call').remove()

    btn.textContent = "New Game!"    

    if (gameStatus == 'w') {
        title.textContent = "Winner Winner Chicken Dinner! :P"
    } else if (gameStatus == 'd') {
        title.textContent = "That was a draw... :/"
    } else if (gameStatus == 'b') {
        title.textContent = "That was a BUST! :("
    } else {
        title.textContent = "Loser... Try again?"
    }

}


function gameControl() {
    if (!st_running) {

        st_running = true

        deck = buildDeck()
        dealerDraw(2)
        updateCardHist(dealer_card_history, dealer_draws[0])

        title.textContent = "Big Money Big Money..."
        playerDraw(2)
        btn.textContent = "Hit Me!"

        createButton(controller)

        if (player_score >= 21) {
            endgame()
        }

    } else if (!game_end) {

        playerDraw(1)
        
        if (player_score >= 21) {
            endgame()
        }

    } else {
        // reset all variables
        st_running = false
        player_score = 0
        dealer_score = 0
        player_aces = 0
        dealer_aces = 0
        dealer_draws = Array()
        game_end = false
        player_card_history.textContent = "Cards: "
        dealer_card_history.textContent = "Cards: "
        document.getElementById('dealer_score_print').remove()
        title.textContent = "Big Money Big Money..."
        gameControl()
    }

}


function updateCardHist(display, card) {

    if (display.textContent === "Cards: ") {
        display.textContent += card;
    } else {
        display.textContent += " - " + card;
    }

}