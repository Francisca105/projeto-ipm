// Target class (position and width)
class Target
{
  constructor(x, y, w, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.correct = false;
    this.id     = id;
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return (mouse_x > this.x && mouse_x < this.x + this.width && mouse_y > this.y && mouse_y < this.y + this.width);
  }
  
  // Draws the target (i.e., a circle)
  // and its label
  draw(bg_color, first, last)
  {
     stroke(0);
    // Draw target
    if (this.correct == false) 
      fill(bg_color);   
    else 
      fill(color(245, 245, 220));
    
    rect(this.x, this.y, this.width, this.width);
    
    // Draw label
    textFont("Arial", 12);
    if (this.correct == false) 
      fill(color(255,255,255));
    else
      fill(color(0,0,0));
    textAlign(CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.width / 2);
    textFont("Arial", 15);
    if (this.correct == false) 
      fill(color(255,255,255));
    else
      fill(color(0,0,0));
    textAlign(CENTER);
    text(this.label.substring(0, 3), this.x + this.width / 2, this.y + this.width*0.6 / 2);

    // Law of proximity: draw a box around the target
    // Law of common region: draw a box around the target
    // Law of similarity: draw a box around the target
    // Law of connectedness: draw a box around the target
     // Miller's Law: Only have less than 7 colors in the design
    // Hick's Law: don't divide the targets into categories because there would 2 searches necessary

    // Draw boxes around same letter targets and a big letter before each new letter
    if (first)
    {
      textFont("Arial", 30);
      fill(color(255, 255, 0));
      textAlign(CENTER);
      stroke(255, 0, 0);
      strokeWeight(4);
      text(this.label[1], this.x - this.width * 0.1, this.y + this.width/8);

      strokeWeight(1);
      noFill();
      stroke(255);
    }
    if (last)
    {
      noFill();
      stroke(255);
    }
    if (!first && !last) {
      noFill();
      stroke(255);
    }
    noStroke();

    textFont("Arial", 16);
    fill(color(255, 255, 255));
  }

  // I made a getter for the label so I can access it in sketch.js in order to know when the second letter changes.
  getLabel()
  {
    return this.label;
  }
}
