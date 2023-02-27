var i = -1;
function setup() {
  createCanvas(windowWidth/2, windowHeight/2).center();
  noFill();
  stroke(color(0, 255, 0));

}

function draw() {
  translate(width/2, height/2);
  background(0);
  const count = 10
  const offset = frameCount % (400 / count);
  for(let i = 0; i < count + 10; i++){
    strokeWeight(max((count - i) / 10, 0.15));
    arc(0, 200, offset + 400 / count * i, offset + 400 / count * i, PI, 0);
  }
  translate(0, 200);
  // if (frameCount % 60 == 0) {
  //   i = -i
  // }
  rotate(25);
  strokeWeight(2);
  line(0, 0, 600, 0);
}