// let lines = []; // Array to store lines
// let currentLine = []; // Store points for the current line being drawn

function setup() {
  createCanvas(800, 400);
  background(255);
//   field();

//   // Create an undo button
//   let undoButton = createButton('Undo');
//   undoButton.mousePressed(undoLastLine);
}

// function draw() {
//   background(255); // Clear the canvas
//   field();
//   drawLines(); // Draw all lines
// }

// function mousePressed() {
//   currentLine = []; // Start a new line
//   currentLine.push([mouseX, mouseY]); // Add the start point
// }

// function mouseDragged() {
//   currentLine.push([mouseX, mouseY]); // Add points as the mouse moves
// }

// function mouseReleased() {
//   if (currentLine.length > 1) { // Check if the line has more than one point
//     lines.push(currentLine); // Add the finished line to the lines array
//   }
//   currentLine = []; // Reset currentLine
// }

// function drawLines() {
//   for (let i = 0; i < lines.length; i++) {
//     let linePoints = lines[i];
//     beginShape();
//     for (let j = 0; j < linePoints.length; j++) {
//       let point = linePoints[j];
//       vertex(point[0], point[1]);
//     }
//     endShape();
//   }
// }

// function undoLastLine() {
//   if (lines.length > 0) {
//     lines.pop(); // Remove the last line
//   }
// }

// function field() {
//   textAlign(CENTER);
//   rectMode(CENTER);
//   strokeCap(SQUARE)
//   noStroke();
//   fill(255);
//   rect(400, 200, 800, 400);

//   fill(0);

//   // text("You are scouting team " + teamNum + ".", 400,25);


//   // arena
//   stroke(0);
//   strokeWeight(4);
//   fill(220);
//   beginShape();
//   vertex(50, 50);
//   vertex(50, 313);
//   vertex(126, 373);
//   vertex(627, 373);
//   vertex(703, 313);
//   vertex(703, 50);
//   endShape(CLOSE);
//   strokeWeight(3);
//   stroke(0,200)
//   line(376.5,50,376.5,373)
//   rectMode(CORNER)
  
//   strokeWeight(2)
  
//   //BLUE FIELD ELEMENTS
//   //amp
//   fill(10,40,200)
//   rect(99,35,61,20)
//   //speaker
//   strokeWeight(2)
//   beginShape()
//   vertex(50,110);
//   vertex(90,130);
//   vertex(90,170);
//   vertex(50,190)
//   endShape(CLOSE)
//   //zone
//   stroke(10,40,200)
//   line(280,50,280,375)
//   stroke(0)
//   // stage
//   drawStage(true)
  
//   //RED FIELD ELEMENTS
//   stroke(0)
//   // amp
//   fill(200,10,40)
//   rect(593,35,61,20)
//   //speaker
//   strokeWeight(2)
//   beginShape()
//   vertex(700,110);
//   vertex(660,130);
//   vertex(660,170);
//   vertex(700,190)
//   endShape(CLOSE)
//   //zone
//   stroke(200,10,40)
//   line(473,50,473,375)
//   stroke(0)
//   // stage
//   push();
//   scale(-1, 1);
//   translate(-752, 0);
//   drawStage(false);
//   pop();
  

// }

// function drawStage(c) {
//   fill(150);
//   strokeWeight(15);
//   stroke(150);
//   let startX = 233;
//   let startY = 212;
//   let lineLength = 65;
//   let angle = radians(120);
  
//   strokeWeight(2);
//   c ? stroke(10, 40, 200): stroke(200, 10, 40)
//   let endX1 = startX - lineLength, endY1 = startY;
//   let endX2 = startX + cos(PI - angle) * lineLength, endY2 = startY + sin(PI - angle) * lineLength; 
//   let endX3 = startX + cos(PI + angle) * lineLength, endY3 = startY + sin(PI + angle) * lineLength;

//   line(endX1, endY1, endX2, endY2);
//   line(endX1, endY1, endX3, endY3);
//   line(endX2, endY2, endX3, endY3);
  
//   fill(150);
//   strokeWeight(15);
//   stroke(150);

//   line(startX, startY, startX - lineLength, startY);
//   push();
//   translate(startX, startY);
//   rotate(angle);
//   line(0, 0, -lineLength, 0);
//   rotate(angle);
//   line(0, 0, -lineLength, 0);
//   pop();

//   noStroke();
//   fill(150); 
//   triangle(250, 182, 250, 242, 200, 212);
//   strokeWeight(2)
// }

const coachMap = (p) => {
  let lines = [];
  let currentLine = [];
  let drawing = true;
  let undoStack = [];
  
  let drawButton, eraseButton, undoButton;
  let drawButtonColor, eraseButtonColor, undoButtonColor;
  let colorPicker;
  
  let b_charge = 0
  let r_charge = 0
  
  
  let canvas;
  
  p.setup = () => {
    canvas = p.createCanvas(800, 400);
    // Disable scrolling with Apple Pencil
    canvas.elt.addEventListener("touchstart", handleTouchStart, false);
    canvas.elt.addEventListener("touchmove", handleTouchMove, false);
  
    // Rest of your setup code
    p.background(255);
    strokeCap(ROUND)
  
    drawButtonColor = p.color(0, 255, 0);
    eraseButtonColor = p.color(255, 0, 0);
    undoButtonColor = p.color(0, 0, 255);
  
    colorPicker = p.createColorPicker(p.color(0, 0, 0));
    colorPicker.position(100, 200);
  };
  
  p.draw = () => {
      p.background(255);
      p.noStroke()
      field();
  
      for (let line of lines) {
        p.stroke(line.color);
        p.strokeWeight(5);
        p.noFill();
        p.beginShape();
        for (let point of line.points) {
          p.vertex(point.x, point.y);
        }
        p.endShape();
      }
  
      // Draw buttons
      p.stroke(255)
      p.strokeWeight(1)
      p.fill(drawing ? drawButtonColor : 200);
      p.rect(285, 10, 80, 30, 3);
      p.fill(!drawing ? eraseButtonColor : 200);
      p.rect(385, 10, 80, 30, 3);
      p.fill(undoButtonColor);
      p.rect(485, 10, 80, 30, 3);
    
      // Draw button labels
      p.fill(255);
      p.textSize(16);
      p.textAlign(CENTER, CENTER);
      p.text('Draw', 325, 25);
      p.text('Erase', 425, 25);
      p.text('Undo', 525, 25);
  };
  
  p.touchStarted = () => {
    if (p.touches.length > 0 && p.touches[0].x > 100 && p.touches[0].y > 100) {
      if (drawing) {
        currentLine = {
          points: [],
          color: colorPicker.color(),
        };
        lines.push(currentLine);
      } else {
        eraseLine(p.touches[0].x, p.touches[0].y);
      }
    } else {
      checkButtons();
    }
  };
  
  p.touchMoved = () => {
    if (p.touches.length > 0 && p.touches[0].x > 100 && p.touches[0].y > 100 && drawing) {
      if (currentLine) {
        currentLine.points.push(p.createVector(p.touches[0].x, p.touches[0].y));
      }
    }
  };
  
  p.touchEnded = () => {
    currentLine = null;
  };
  
  function eraseLine(touchX, touchY) {
    for (let i = lines.length - 1; i >= 0; i--) {
      let line = lines[i];
      for (let point of line.points) {
        let d = p.dist(touchX, touchY, point.x, point.y);
        if (d < 10) {
          undoStack.push(lines.splice(i, 1)[0]);
          return;
        }
      }
    }
  }
  
  function checkButtons() {
    if (p.touches.length > 0) {
      let touchX = p.touches[0].x;
      let touchY = p.touches[0].y;
  
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
  };

  new p5(coachMap, "coachCanvas")