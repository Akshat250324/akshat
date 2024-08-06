score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3'); 

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {                                      /*make keys usable*/
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {                                                  /*car up */
    car = document.querySelector(".car");
    car.classList.add("animateCar");
    setTimeout(() => {
      car.classList.remove("animateCar");
    }, 700);
  }
  if (e.keyCode == 39) {
    car = document.querySelector(".car");
    carX = parseInt(
      window.getComputedStyle(car, null).getPropertyValue("left")
    );
    car.style.left = carX + 112 + "px";
  }
  if (e.keyCode == 37) {
    car = document.querySelector(".car");
    carX = parseInt(
      window.getComputedStyle(car, null).getPropertyValue("left")
    );
    car.style.left = carX - 112 + "px";
  }
};

setInterval(() => {                                                       /* detects that the object has crashed or not */
  car = document.querySelector(".car");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  dx = parseInt(window.getComputedStyle(car, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(car, null).getPropertyValue("top"));
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offSetx = Math.abs(dx - ox);
  offSety = Math.abs(dy - oy);
  //console.log(offSetx,offSety)
  if (offSetx < 73 && offSety < 52) {
    car.classList.add("carDown");
    gameOver.innerHTML = "Game Over - Reload to start over";        /* after detect collision stop obstacle and game over */
    obstacle.classList.remove("obstacleAni");
    
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
        audio.pause();
    }, 1000);
  } 
  
  else if (offSetx < 145 && cross) {
    score += 100;                                        /* to set score to score container */
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat( window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
      newDur = aniDur - 0.1;    //to set speed of obstacle
      obstacle.style.animationDuration = newDur + "s";
      console.log('New animation duration',newDur)
    }, 500);
  }
}, 10);
function updateScore(score) {                         // to update score 
  scoreCont.innerHTML = "Your Score: " + score;
}