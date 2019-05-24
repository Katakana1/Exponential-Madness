var game = {
  number: new Decimal(10),
  mult: {
    amount:[1337, new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
    cost:[420, new Decimal(10), new Decimal(1e10), Decimal.fromComponents(1, 2, 2), Decimal.fromComponents(1, 2, 3), Decimal.fromComponents(1, 2, 6), Decimal.fromComponents(1, 2, 10)],
    unlocked:[69, false, false, false, false, false, false]
  },
};
setInterval(function() {
  game.number = game.number.mul(game.mult.amount[1].root(100));
  game.mult.amount[1] = game.mult.amount[1].mul(game.mult.amount[2].root(100));
  game.mult.amount[2] = game.mult.amount[2].mul(game.mult.amount[3].root(100));
  game.mult.amount[3] = game.mult.amount[3].mul(game.mult.amount[4].root(100));
  game.mult.amount[4] = game.mult.amount[4].mul(game.mult.amount[5].root(100));
  if(game.mult.unlocked[6] == true){
    game.mult.amount[5] = game.mult.amount[5].exp(game.mult.amount[6].root(100));
  }
  updateStuff();
}, 10);
function updateStuff() {
  document.getElementById("number").innerHTML = findDisplayValue(game.number);
  document.getElementById("mult1").innerHTML = findDisplayValue(game.mult.amount[1]);
  document.getElementById("mult2").innerHTML = findDisplayValue(game.mult.amount[2]);
  document.getElementById("mult3").innerHTML = findDisplayValue(game.mult.amount[3]);
  document.getElementById("mult4").innerHTML = findDisplayValue(game.mult.amount[4]);
  document.getElementById("mult5").innerHTML = findDisplayValue(game.mult.amount[5]);
  document.getElementById("mult6").innerHTML = findDisplayValue(game.mult.amount[6]);
  if (game.mult.unlocked[1] == false) {
    document.getElementById("multButton1").innerHTML = "Unlock Multiplier 1 Cost: " + findDisplayValue(game.mult.cost[1]);
  } else {
    document.getElementById("multButton1").innerHTML = "Square Multiplier 1 Cost: " + findDisplayValue(game.mult.cost[1]);
  }
  if (game.mult.unlocked[2] == false) {
    document.getElementById("multButton2").innerHTML = "Unlock Multiplier 2 Cost: " + findDisplayValue(game.mult.cost[2]);
  } else {
    document.getElementById("multButton2").innerHTML = "Square Multiplier 2 Cost: " + findDisplayValue(game.mult.cost[2]);
  }
  if (game.mult.unlocked[3] == false) {
    document.getElementById("multButton3").innerHTML = "Unlock Multiplier 3 Cost: " + findDisplayValue(game.mult.cost[3]);
  } else {
    document.getElementById("multButton3").innerHTML = "Square Multiplier 3 Cost: " + findDisplayValue(game.mult.cost[3]);
  }
  if (game.mult.unlocked[4] == false) {
    document.getElementById("multButton4").innerHTML = "Unlock Multiplier 4 Cost: " + findDisplayValue(game.mult.cost[4]);
  } else {
    document.getElementById("multButton4").innerHTML = "Square Multiplier 4 Cost: " + findDisplayValue(game.mult.cost[4]);
  }
  if (game.mult.unlocked[5] == false) {
    document.getElementById("multButton5").innerHTML = "Unlock Multiplier 5 Cost: " + findDisplayValue(game.mult.cost[5]);
  } else {
    document.getElementById("multButton5").innerHTML = "Square Multiplier 5 Cost: " + findDisplayValue(game.mult.cost[5]);
  }
  if (game.mult.unlocked[6] == false) {
    document.getElementById("multButton6").innerHTML = "Unlock Multiplier 6 Cost: " + findDisplayValue(game.mult.cost[6]);
  } else {
    document.getElementById("multButton6").innerHTML = "Square Multiplier 6 Cost: " + findDisplayValue(game.mult.cost[6]);
  }
}
function buyMult(n) {
  if (game.number.greaterThanOrEqualTo(game.mult.cost[n])) {
    game.number = game.number.div(game.mult.cost[n]);
    if (game.mult.unlocked[n] == false) {
      game.mult.amount[n] = game.mult.amount[n].mul(1.5);
      game.mult.unlocked[n] = true;
    } else {
      game.mult.amount[n] = game.mult.amount[n].pow(2);
      game.mult.cost[n] = game.mult.cost[n].pow(1000);
    }
    updateStuff();
  }
}
function findDisplayValue(n) {
  if (n.lessThan(1000)) {
    return n.toFixed(2);
  } else if (n.lessThan(1e100)) {
    return n.m.toFixed(2) + "e" + findDisplayValue(new Decimal(n.mag));
  } else if (n.lessThan(Decimal.fromComponents(1, 4, 1))) {
    return "e" + findDisplayValue(new Decimal(n.mag));
  } else {
    return "E" + new Decimal(n.mag) + "#" + n.layer;
  }
}
