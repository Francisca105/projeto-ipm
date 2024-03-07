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
    this.color = color(155,155,155)
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    return dist(this.x, this.y, mouse_x, mouse_y) < this.width / 2;
  }
  
  // Draws the target (i.e., a circle)
  // and its label

  draw()
  {
    let nd_l = this.label.charAt(1).toLowerCase();
    switch (nd_l) {
      case 'a':
        console.log("A");
        let rd_l = this.label.charCodeAt(2) - "a".charCodeAt(0);
        this.color = color(82, 69, 0); // Amarelo coco
        // this.color = color(82, 69, rd_l); // Amarelo coco
        // console.log(rd_l)

        break;
      case 'é':
      case 'e':
        this.color = color(57, 166, 35); // Verde
        break;
      case 'o':
        this.color = color(166, 90, 20); // Alaranjado
        break;
      case 'r':
        this.color = color(140, 17, 6); // Vermelho
        break;
      case 'u':
        this.color = color(22, 125, 99); // Azul Esverdeado
        break;
      case 'i':
        this.color = color(99, 22, 125); // Roxo
        break;
      case 'y':
        this.color = color(19, 17, 105); // Azul
        break;
      case 'h':
        this.color = color(196, 33, 156); // Cor de rosa
        break;
      case 'l':
        this.color = color(66, 71, 77); // Cinzento
        break;
      case 'n':
        this.color = color(209, 113, 40); // Laranja Laranja
        break;
      default:
        console.log(nd_l)
        this.color = color(0,0,0); // Não acontece - preto
        break;
    }

    let regex = /[șłš]/g;
    if(this.label.match(regex)) {
      stroke(color(150,150,150))
      strokeWeight(2)
    }

    // Draw target
    fill(this.color); 
    circle(this.x, this.y, this.width);
    
    // Draw label
    noStroke();
    textFont("Arial", 12);
    fill(color(255,255,255));
    textAlign(CENTER);
    text(this.label, this.x, this.y);
  }
}