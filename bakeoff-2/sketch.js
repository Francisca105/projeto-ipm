// Bake-off #2 -- Seleção em Interfaces Densas
// IPM 2023-24, Período 3
// Entrega: até às 23h59, dois dias úteis antes do sexto lab (via Fenix)
// Bake-off: durante os laboratórios da semana de 18 de Março

// p5.js reference: https://p5js.org/reference/

// Database (CHANGE THESE!)
const GROUP_NUMBER        = 44;      // Add your group number here as an integer (e.g., 2, 3)
const RECORD_TO_FIREBASE  = true;  // Set to 'true' to record user results to Firebase

// Pixel density and setup variables (DO NOT CHANGE!)
let PPI, PPCM;
const NUM_OF_TRIALS       = 12;     // The numbers of trials (i.e., target selections) to be completed
let continue_button;
let legendas;                       // The item list from the "legendas" CSV

// Metrics (DO NOT CHANGE!)
let testStartTime, testEndTime;     // time between the start and end of one attempt (8 trials)
let hits 			      = 0;      // number of successful selections
let misses 			      = 0;      // number of missed selections (used to calculate accuracy)
let database;                       // Firebase DB  

// Study control parameters (DO NOT CHANGE!)
let draw_targets          = false;  // used to control what to show in draw()
let trials;                         // contains the order of targets that activate in the test
let current_trial         = 0;      // the current trial number (indexes into trials array above)
let attempt               = 0;      // users complete each test twice to account for practice (attemps 0 and 1)

// Target list and layout variables
let targets               = [];
const GRID_ROWS           = 8;      // We divide our 80 targets in a 8x10 grid
const GRID_COLUMNS        = 10;     // We divide our 80 targets in a 8x10 grid

// Some added constants
const BIG_NUMBER          = 5000;   // used to create retangles that go till the end of the screen
let last_id               = -1;

// Ensures important data is loaded before the program starts
function preload()
{
  // id,name,...
  legendas = loadTable('legendas.csv', 'csv', 'header');

  sound = loadSound('assets/mixkit-correct-answer-tone-2870.wav')
}

// Rearranges the data from the 'legendas.csv' file in alphabetical order
// Uses the insertion sort
function rearrangeData()
{
  legendas.setString(62, 'city', 'Bechar'); // temporarily takes away the special character
  let i, j, key;
  for (i = 2; i < legendas.getRowCount(); i++)
  {
    key = legendas.getString(i, 'city');
    j = i - 1;

    while (j >= 0 && legendas.getString(j, 'city') > key)
    {
      legendas.setString(j + 1, 'city', legendas.getString(j, 'city'));
      j = j - 1;
    }
    legendas.setString(j + 1, 'city', key);
  }
  legendas.setString(27, 'city', 'Béchar'); // gives back the special character
}

// Runs once at the start
function setup()
{
  createCanvas(700, 500);    // window size in px before we go into fullScreen()
  frameRate(60);             // frame rate (DO NOT CHANGE!)
  
  rearrangeData();           // rearranges the grid in alphabetical order

  randomizeTrials();         // randomize the trial order at the start of execution
  drawUserIDScreenTemp();        // draws the user start-up screen (student ID and display size)
}

// Runs every frame and redraws the screen
function draw()
{
  if (draw_targets && attempt < 2)
  {     
    // The user is interacting with the 6x3 target grid
    background(color(0,0,0));        // sets background to black
    
    // Print trial count at the top left-corner of the canvas
    textFont("Arial", 16);
    fill(color(255,255,255));
    textAlign(LEFT);
    text("Trial " + (current_trial + 1) + " of " + trials.length, 50, 20);

    // Draws the retangles behind the targets
    drawColoredZone(0, 26, '#F94144');
    drawColoredZone(27, 37, '#F3722C');
    drawColoredZone(38, 40, '#F9C74F');
    drawColoredZone(41, 49, '#90BE6D');
    drawColoredZone(52, 55, '#F94144');
    drawColoredZone(56, 68, '#F3722C');
    drawColoredZone(69, 78, '#F9C74F');

    // Draws all targets
	for (var i = 0; i < legendas.getRowCount(); i++) {
    if (targets[i].clicked(mouseX, mouseY)) targets[i].draw(true);
    else targets[i].draw(false);
  }
    
    // Draws the target label to be selected in the current trial. We include 
    // a black rectangle behind the trial label for optimal contrast in case 
    // you change the background colour of the sketch (DO NOT CHANGE THESE!)
    fill(color(0,0,0));
    rect(0, height - 40, width, 40);
 
    textFont("Arial", 20); 
    fill(color(255,255,255)); 
    textAlign(CENTER); 
    text(legendas.getString(trials[current_trial],1), width/2, height - 20);
  }
}

// Print and save results at the end of 54 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE! 
  let accuracy			= parseFloat(hits * 100) / parseFloat(hits + misses);
  let test_time         = (testEndTime - testStartTime) / 1000;
  let time_per_target   = nf((test_time) / parseFloat(hits + misses), 0, 3);
  let penalty           = constrain((((parseFloat(95) - (parseFloat(hits * 100) / parseFloat(hits + misses))) * 0.2)), 0, 100);
  let target_w_penalty	= nf(((test_time) / parseFloat(hits + misses) + penalty), 0, 3);
  let timestamp         = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  textFont("Arial", 18);
  background(color(0,0,0));   // clears screen
  fill(color(255,255,255));   // set text fill color to white
  textAlign(LEFT);
  text(timestamp, 10, 20);    // display time on screen (top-left corner)
  
  textAlign(CENTER);
  text("Attempt " + (attempt + 1) + " out of 2 completed!", width/2, 60); 
  text("Hits: " + hits, width/2, 100);
  text("Misses: " + misses, width/2, 120);
  text("Accuracy: " + accuracy + "%", width/2, 140);
  text("Total time taken: " + test_time + "s", width/2, 160);
  text("Average time per target: " + time_per_target + "s", width/2, 180);
  text("Average time for each target (+ penalty): " + target_w_penalty + "s", width/2, 220);

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:       GROUP_NUMBER,
        assessed_by:        student_ID,
        test_completed_by:  timestamp,
        attempt:            attempt,
        hits:               hits,
        misses:             misses,
        accuracy:           accuracy,
        attempt_duration:   test_time,
        time_per_target:    time_per_target,
        target_w_penalty:   target_w_penalty,
  }
  
  // Sends data to DB (DO NOT CHANGE!)
  if (RECORD_TO_FIREBASE)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Adds user performance results
    let db_ref = database.ref('Lab 5');
    db_ref.push(attempt_data);
  }
}

// Mouse button was pressed - lets test to see if hit was in the correct target
function mousePressed() 
{
  // Only look for mouse releases during the actual test
  // (i.e., during target selections)
  if (draw_targets)
  {
    for (var i = 0; i < legendas.getRowCount(); i++)
    {
      // Check if the user clicked over one of the targets
      if (targets[i].clicked(mouseX, mouseY)) 
      {
        sound.play();
        last_id = i;
        // Checks if it was the correct target
        if (targets[i].id === trials[current_trial] + 1) hits++;
        else misses++;
        
        current_trial++;              // Move on to the next trial/target
        break;
      }
    }
    
    // Check if the user has completed all trials
    if (current_trial === NUM_OF_TRIALS)
    {
      testEndTime = millis();
      draw_targets = false;          // Stop showing targets and the user performance results
      printAndSavePerformance();     // Print the user's results on-screen and send these to the DB
      attempt++;                      
      
      // If there's an attempt to go create a button to start this
      if (attempt < 2)
      {
        continue_button = createButton('START 2ND ATTEMPT');
        continue_button.mouseReleased(continueTest);
        continue_button.position(width/2 - continue_button.size().width/2, height/2 - continue_button.size().height/2);
      }
    }
    // Check if this was the first selection in an attempt
    else if (current_trial === 1) testStartTime = millis(); 
  }
}

// Evoked after the user starts its second (and last) attempt
function continueTest()
{
  // Re-randomize the trial order
  randomizeTrials();
  
  // Resets performance variables
  hits = 0;
  misses = 0;
  
  current_trial = 0;
  continue_button.remove();
  
  // Shows the targets again
  draw_targets = true; 
}

// Creates and positions the UI targets
function createTargets(target_size, horizontal_gap, vertical_gap)
{
  // Define the margins between targets by dividing the white space 
  // for the number of targets minus one
  h_margin = horizontal_gap / (GRID_COLUMNS -1);
  v_margin = vertical_gap / (GRID_ROWS - 1);
  
  // Set targets in a 8 x 10 grid
  for (var r = 0; r < GRID_ROWS; r++)
  {
    for (var c = 0; c < GRID_COLUMNS; c++)
    {
      let target_x = 40 + (h_margin + target_size) * c + target_size/2;        // give it some margin from the left border
      let target_y = (v_margin + target_size) * r + target_size/2;
      
      // Find the appropriate label and ID for this target
      let legendas_index = c + GRID_COLUMNS * r;
      let target_id = legendas.getNum(legendas_index, 0);  
      let target_label = legendas.getString(legendas_index, 1);   
      
      let target = new Target(target_x, target_y + 40, target_size, target_label, target_id);
      targets.push(target);
    }  
  }
}

// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized() 
{
  if (fullscreen())
  {
    resizeCanvas(windowWidth, windowHeight);
    
    // DO NOT CHANGE THE NEXT THREE LINES!
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm
  
    // Make your decisions in 'cm', so that targets have the same size for all participants
    // Below we find out out white space we can have between 2 cm targets
    let screen_width   = display.width * 2.54;             // screen width
    let screen_height  = display.height * 2.54;            // screen height
    let target_size    = 2;                                // sets the target size (will be converted to cm when passed to createTargets)
    let horizontal_gap = screen_width - target_size * GRID_COLUMNS;// empty space in cm across the x-axis (based on 10 targets per row)
    let vertical_gap   = screen_height - target_size * GRID_ROWS;  // empty space in cm across the y-axis (based on 8 targets per column)

    // Creates and positions the UI targets according to the white space defined above (in cm!)
    // 80 represent some margins around the display (e.g., for text)
    createTargets(target_size * PPCM, horizontal_gap * PPCM - 80, vertical_gap * PPCM - 80);

    // Starts drawing targets immediately after we go fullscreen
    draw_targets = true;
  }
}

// Draws the retangles that stay behind the targets
function drawColoredZone(first, last, colour)
{
  let firstX = targets[first].getX();
  let lastX = targets[last].getX();
  let firstY = targets[first].getY();
  let lastY = targets[last].getY();
  let width = targets[0].getWidth();

  fill(color(colour));
  // stroke(color(colour));
  // strokeWeight(2);

  if (lastY - firstY)
  {
    rect(firstX - width/2, firstY - width/2, BIG_NUMBER, width, 100, 0, 0, 100);
    let midY = targets[first+10].getY();
    if (lastY - midY)
    {
      rect(-10, midY - width/2, BIG_NUMBER, width, 0, 0, 0, 0);
    }
    rect(-10, lastY - width/2, lastX + width/2, width, 0, 100, 100, 0);
  } else
  {
    rect(firstX - width/2, firstY - width/2, lastX - firstX + width, width, 100, 100, 100, 100);
  }
}