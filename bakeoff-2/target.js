// Target class (position and width)
class Target
{
  constructor(x, y, w, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l; //label_capitalizer(l, 2,3)
    this.id     = id;
    this.color = color(155,155,155)

    function label_capitalizer (l, ...n) {
      let label = "";
      let _l = l
      let check = 0;

      n.forEach(element => {
        label += _l.substring(check, element) + _l.charAt(element).toUpperCase()
        check = element+1
      });

      label += _l.substring(check)
      
      return label
    }
  }

  getX() { return this.x;}
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

  draw(bool)
  {
    // DO NOT CHANGE THE NEXT THREE LINES!
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm
    
    let colors;
    let nd_l = this.label.charAt(1).toLowerCase();
    switch (nd_l) {
      case 'a':
        colors = color(249, 65, 68);
        break;
      case 'é':
      case 'e':
        colors = color(243, 114, 44);
        break;
      case 'h':
        colors = color(249, 199, 79);
        break;
      case 'i':
        colors = color(144, 190, 109);
        break;
      case 'l':
        colors = color(67, 170, 139);
        break;
      case 'n':
        colors = color(87, 117, 144);
        break;
      case 'o':
        colors = color(249, 65, 68);
        break;
      case 'r':
        colors = color(243, 114, 44);
        break;
      case 'u':
        colors = color(249, 199, 79);
        break;
      case 'y':
        colors = color(144, 190, 109);
        break;
    }

    // let regex = /[șłš]/g;
    // if(this.label.match(regex)) {
    //   stroke("#000000")
    //   strokeWeight(1)
    // }

    // Draws target
    noStroke();
    fill(colors);
    if (!bool) circle(this.x, this.y, this.width);
    else circle(this.x, this.y, 1.2*this.width);

    if(this.label.includes(' ')) {
      stroke(color("#ffffff"))
      strokeWeight(3)
    }
    
    // Draws inner circle to achieve the stroke effect
    if (!bool && last_id != this.id-1) {
      fill('#000');
      circle(this.x, this.y, this.width*0.9);
    } else if (!bool) {
      fill(colors);
      circle(this.x, this.y, this.width*0.9);
    }
    else {
      fill(colors);
      circle(this.x, this.y, 1.2*this.width*0.9);
    }
    
    noStroke()
    // Draw label
    if (!bool) textFont("Helvetica", 14);
    else textFont("Helvetica", 20);
    fill(color(255,255,255));
    textAlign(CENTER);
    nd_l = nd_l.toUpperCase();
    let city = this.label.charAt(0)  + nd_l + this.label.substring(2);
    text(this.label, this.x, this.y);

    let id = this.id;
    if (id == 1 || id == 28 || id == 39 || id == 42 || id == 51 || id == 52 || id == 53 || id == 57 || id == 70 || id == 80)
    {
      textFont("Helvetica", 26);
      fill(color(255, 255, 0));
      textAlign(CENTER, CENTER);
      let label = this.label
      if (label[1] == 'é') text(label[0]+'e', this.x - this.width * 17/24, this.y);
      else text(label[0]+label[1], this.x - this.width * 17/24, this.y);
    }
  }
}