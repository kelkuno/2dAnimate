const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
  // orientation: 'landscape',
  // units: 'cm',
  // pixelsPerInch: 300
};

const sketch = () => {
  const palette = random.pick(palettes);
  console.log(palette);
  const createGrid = () => {
    const points = [];
    const count = 50;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? .05 : x / (count - 1);
        const v = count <= 1 ? .05 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u,v)) * .05;
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius
          // radius: Math.abs(random.gaussian() * .01)
        });
      }
    }
    return points;
  }
  const margin = 100;
  //////////////////////draw out regular grid
  // const points = createGrid();


  ////////////////math.random removes random points in grid
  // const points = createGrid().filter(()=>Math.random()>0.5);

  ///////////////////math.random has limitations, here's the same using the random util, which is more refined
  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.5);


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {

      const {
        position,
        radius, 
        color
      } = data;

      const [u,v] = position;
      ///////this has the artwork start at the very top and bottom of the screen w/out a margin.
      // const x = u * width;
      // const y = v * height;

      //this gives the grid some margin
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);



      //draw circles
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2);
      context.fillStyle = color;
      context.lineWidth = 40;
      context.fill();
    });
  };

  // context.fillStyle = 'red';
  // context.fillRect(0, 0, width, height);
  //////////////////////////draw a circle path
  // context.beginPath();
  // context.arc(width/2, height/2, width * .06, 0, Math.PI * 2, false);
  // context.fillStyle = 'orange';
  // context.fill();
  // context.lineWidth = 40;
  // context.strokeStyle = 'blue';
  // context.stroke();

};


canvasSketch(sketch, settings);
