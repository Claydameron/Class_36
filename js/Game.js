class Game {
  constructor(){}
  
  getState(){
   // var gameStateRef  = database.ref('gameState');
   database.ref('gameState').on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      
      
      var data1 = await database.ref("playerCount").once("value");
      if(data1.exists()) {
        playerCount = data1.val();
        player.getCount();
      } 

      form = new Form()
      form.display();
      
    }
  }

  play() {
    form.hide();
    textSize(30);
    text("GAME START",120,100);
    Player.getPlayersInfo();
    if(allPlayers !== undefined) {
      var displayPosition = 130;
      for(var plr in allPlayers) {
        displayPosition += 20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance,120,displayPosition);
       
        if(plr === "player" + player.index) {
          fill("red");
        } else{
          fill("black");
        }
      }
if(keyDown(UP_ARROW) && player.index !== null) {
  player.distance += 50;
  player.update();
}


      
        }
  }
}
