// Target class (position and width)
class Target
{
  constructor(x, y, w, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.id     = id;
    this.hit    = false;
  }

  getX() {return this.x;}
  getY() {return this.y;}
  getWidth() {return this.width;}
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }
  
  // Draws the target (i.e., a circle)
  // and its label
  draw(colour, hover)
  {
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm

    // Draw target
    if (rand) {
      if (this.hit) {
        stroke(255);
        strokeWeight(2);
        if (!attempt) fill(0);
        else fill(colour);
      } else if (!attempt) {
        stroke(colour);
        strokeWeight(2);
        fill(0);
      } else fill(colour);
    } else {
      if (this.hit) {
        stroke(255);
        strokeWeight(2);
        if (attempt) fill(0);
        else fill(colour);
      } else if (attempt) {
        stroke(colour);
        strokeWeight(2);
        fill(0);
      } else fill(colour);
    }
    rectMode(CENTER);
    if (!hover) rect(this.x, this.y, this.width * 1.2, this.width * 0.9, 25);
    else rect(this.x, this.y, this.width * 1.6, this.width * 1.2, 25);
    
    // Draw label
    noStroke();
    fill(255);
    textAlign(CENTER);
    if (!hover) {
      textFont("Helvetica", PPCM/3);
      text(this.label, this.x, this.y + this.width/6);
    }
    else {
      textFont("Helvetica", PPCM/3 * 4/3);
      text(this.label, this.x, this.y);
    }

    fill(235);
    if (!hover) {
      textSize(PPCM/3 * 1.5);
      text(this.label[0]+this.label[1]+this.label[2], this.x, this.y - this.width/12);
    }
  }
}