import EventEmitter from "events"
const { spawn } = require('child_process');



const plates = []

export default function alprHandler(req, res) {
  if (req.method === 'POST') {
    const ls = spawn('bash', ['manage.sh']);

    ls.stdout.on('data', (data) => {
      console.log(` ${data}`);

    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    const data = req.body.results[0].plate;
    plates.push(`${(data)}`);
    console.log(plates)
    return res.json(data)
  }

  if (req.method === 'GET') {
    res.status(200).json(plates);
  }

  else {
    // Handle any other HTTP method
  }
}