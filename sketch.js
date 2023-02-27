var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem142401'; //rename to the name of your port
var dataarray = []; //some data coming in over serial!
var brightness = 0;
let text = "Alert";

function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  createCanvas(windowWidth/2, windowHeight/2).center();
  noFill();
  stroke(color(0, 255, 0));
  
  var button = createButton(text);
  button.mousePressed(keyPressed);
  button.position(windowWidth/2 - 75, windowHeight/2 - 250);
  button.size(150,50);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
  // Display the list the console:
    print(i + " " + portList[i]);
  }
 }
 
 function serverConnected() {
   print('connected to server.');
 }
  
 function portOpen() {
   print('the serial port opened.')
 }
  
 function serialError(err) {
   print('Something went wrong with the serial port. ' + err);
 }
  
 function portClose() {
   print('The serial port closed.');
 }
 
 function serialEvent() {
   if (serial.available()) {
     var datastring = serial.readLine(); // readin some serial
     var newarray; 
     try {
       newarray = JSON.parse(datastring); // can we parse the serial
       if (typeof newarray == 'object') {
         dataarray = newarray;
       }
      //  console.log("got back " + datastring);
       } catch(err) {
       // got something that's not a json
     }
   } 
 }

 function keyPressed() {
	serial.write(255);
 }


function draw() {
  translate(width/2, height);
  background(0);
  const count = 10
  const offset = frameCount % (400 / count);
  for(let i = 0; i < count + 10; i++){
    strokeWeight(max((count - i) / 10, 0.15));
    arc(0, 0, offset + 400 / count * i, offset + 400 / count * i, PI, 0);
  }
  rotate(-(dataarray[0] * (PI/180)));
  strokeWeight(2);
  distance = dataarray[1];
  distance = constrain(distance, 0, 33);
  line(0, 0, distance*10, 0);
  if (distance <= 10) {
    stroke(color(255, 0, 0));

  }else{
    stroke(color(0, 255, 0));
  }
}