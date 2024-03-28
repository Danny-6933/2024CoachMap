  let lines = [];
  let currentLine = [];
  let drawing = true;
  let undoStack = [];
  
  let drawButton, eraseButton, undoButton;
  let drawButtonColor, eraseButtonColor, undoButtonColor;
  let colorPicker;
  
  let b_charge = 0
  let r_charge = 0
  let myNote
  
  
  let canvas;
  
  function setup() {
    canvas = createCanvas(800, 400);
    // Disable scrolling with Apple Pencil
    canvas.elt.addEventListener("touchstart", handleTouchStart, false);
    canvas.elt.addEventListener("touchmove", handleTouchMove, false);
  
    background(255);
    strokeCap(ROUND);
  
    drawButtonColor = color(0, 255, 0);
    eraseButtonColor = color(255, 0, 0);
    undoButtonColor = color(0, 0, 255);
  
    // Adjust the color picker position to the bottom of the canvas
    colorPicker = createColorPicker(color(0, 0, 0));
    colorPicker.position(20, height - 40); // Adjusted position
    myNote = new Note(100,100, false);
  };
  
  function draw() {
      background(255);
      noStroke()
      field();
      myNote.noteTaken();
      myNote.drawNote();
  
      for (let line of lines) {
        stroke(line.color);
        strokeWeight(5);
        noFill();
        beginShape();
        for (let point of line.points) {
          vertex(point.x, point.y);
        }
        endShape();
      }
  
      // Draw buttons
      stroke(255)
      strokeWeight(1)
      fill(drawing ? drawButtonColor : 200);
      rect(285, 10, 80, 30, 3);
      fill(!drawing ? eraseButtonColor : 200);
      rect(385, 10, 80, 30, 3);
      fill(undoButtonColor);
      rect(485, 10, 80, 30, 3);
    
      // Draw button labels
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text('draw', 325, 25);
      text('Erase', 425, 25);
      text('Undo', 525, 25);
  };
  
  function touchStarted() {
    // Adjusted to remove the specific area restriction
    if (touches.length > 0) {
      // Determine if touch is within button areas or the drawing area
      let touchX = touches[0].x, touchY = touches[0].y;
      if (!isTouchOnButton(touchX, touchY)) {
        if (drawing) {
          currentLine = {
            points: [],
            color: colorPicker.color(),
          };
          lines.push(currentLine);
        } else {
          eraseLine(touchX, touchY);
        }
      } else {
        checkButtons();
      }
    }
  };
  
  function touchMoved() {
    if (touches.length > 0 && touches[0].x > 100 && touches[0].y > 100 && drawing) {
      if (currentLine) {
        currentLine.points.push(createVector(touches[0].x, touches[0].y));
      }
    }
  };
  
  function touchEnded() {
    currentLine = null;
  };
  
  function eraseLine(touchX, touchY) {
    for (let i = lines.length - 1; i >= 0; i--) {
      let line = lines[i];
      for (let point of line.points) {
        let d = dist(touchX, touchY, point.x, point.y);
        if (d < 10) {
          undoStack.push(lines.splice(i, 1)[0]);
          return;
        }
      }
    }
  }
  
  function checkButtons() {
    if (touches.length > 0) {
      let touchX = touches[0].x;
      let touchY = touches[0].y;
  
      if (touchX > 285 && touchX < 365 && touchY > 10 && touchY < 40) {
        drawing = true;
      } else if (touchX > 385 && touchX < 465 && touchY > 10 && touchY < 40) {
        drawing = false;
      } else if (touchX > 485 && touchX < 565 && touchY > 10 && touchY < 40) {
        undo();
      }
    }
  }
  
  function undo() {
    if (lines.length > 0) {
      undoStack.push(lines.pop());
    }
  }
  
  function handleTouchStart(evt) {
    if (evt.touches.length > 1) {
      // Multi-touch gesture, don't prevent default behavior
      return;
    }
  
    // Single touch, prevent scrolling
    evt.preventDefault();
  }
  
  function handleTouchMove(evt) {
    if (evt.touches.length > 1) {
      // Multi-touch gesture, don't prevent default behavior
      return;
    }
  
    // Single touch, prevent scrolling
    evt.preventDefault();
  }

  function isTouchOnButton(x, y) {
    // Define button areas
    // Assuming buttons are rectangles, check if the touch is within any button's area
    return (x > 285 && x < 365 && y > 10 && y < 40) || // Draw button
           (x > 385 && x < 465 && y > 10 && y < 40) || // Erase button
           (x > 485 && x < 565 && y > 10 && y < 40);   // Undo button
  }

function field() {
  textAlign(CENTER);
  rectMode(CENTER);
  strokeCap(SQUARE)
  noStroke();
  fill(255);
  rect(400, 200, 800, 400);

  fill(0);

  // text("You are scouting team " + teamNum + ".", 400,25);


  // arena
  stroke(0);
  strokeWeight(4);
  fill(220);
  beginShape();
  vertex(50, 50);
  vertex(50, 313);
  vertex(126, 373);
  vertex(627, 373);
  vertex(703, 313);
  vertex(703, 50);
  endShape(CLOSE);
  strokeWeight(3);
  stroke(0,200)
  line(376.5,50,376.5,373)
  rectMode(CORNER)
  
  strokeWeight(2)
  
  //BLUE FIELD ELEMENTS
  //amp
  fill(10,40,200)
  rect(99,35,61,20)
  //speaker
  strokeWeight(2)
  beginShape()
  vertex(50,110);
  vertex(90,130);
  vertex(90,170);
  vertex(50,190)
  endShape(CLOSE)
  //zone
  stroke(10,40,200)
  line(280,50,280,375)
  stroke(0)
  // stage
  drawStage(true)
  
  //RED FIELD ELEMENTS
  stroke(0)
  // amp
  fill(200,10,40)
  rect(593,35,61,20)
  //speaker
  strokeWeight(2)
  beginShape()
  vertex(700,110);
  vertex(660,130);
  vertex(660,170);
  vertex(700,190)
  endShape(CLOSE)
  //zone
  stroke(200,10,40)
  line(473,50,473,375)
  stroke(0)
  // stage
  push();
  scale(-1, 1);
  translate(-752, 0);
  drawStage(false);
  pop();
  

}

function drawStage(c) {
  fill(150);
  strokeWeight(15);
  stroke(150);
  let startX = 233;
  let startY = 212;
  let lineLength = 65;
  let angle = radians(120);
  
  strokeWeight(2);
  c ? stroke(10, 40, 200): stroke(200, 10, 40)
  let endX1 = startX - lineLength, endY1 = startY;
  let endX2 = startX + cos(PI - angle) * lineLength, endY2 = startY + sin(PI - angle) * lineLength; 
  let endX3 = startX + cos(PI + angle) * lineLength, endY3 = startY + sin(PI + angle) * lineLength;

  line(endX1, endY1, endX2, endY2);
  line(endX1, endY1, endX3, endY3);
  line(endX2, endY2, endX3, endY3);
  
  fill(150);
  strokeWeight(15);
  stroke(150);

  line(startX, startY, startX - lineLength, startY);
  push();
  translate(startX, startY);
  rotate(angle);
  line(0, 0, -lineLength, 0);
  rotate(angle);
  line(0, 0, -lineLength, 0);
  pop();

  noStroke();
  fill(150); 
  triangle(250, 182, 250, 242, 200, 212);
  strokeWeight(2)
}

class Note {
  constructor (x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
  }

   drawNote() {
    if(this.state) {
      // Draw a medium sized black X at (x, y)
      stroke(0); // Black color
      strokeWeight(3); // Medium thickness
      line(this.x - 10, this.y - 10, this.x + 10, this.y + 10);
      line(this.x + 10, this.y - 10, this.x - 10, this.y + 10);
    } else {
      // Draw a medium sized orange circle at (x, y)
      stroke(255, 165, 0); // Orange color
      fill(255, 165, 0); // Fill color same as stroke for a solid ring appearance
      strokeWeight(3); // Thickness of the ring
      noFill(); // Makes the circle hollow
      ellipse(this.x, this.y, 25); 
    }
   }
   noteTaken() {
    // Assuming a simple bounding box approach for touch detection
    if (mouseX > this.x - this.size/2 && mouseX < this.x + this.size/2 &&
        mouseY > this.y - this.size/2 && mouseY < this.y + this.size/2) {
      this.state = !this.state; // Toggle the state
    }
  }
}
