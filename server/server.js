
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());


// Sample milestone records stored in memory.
const milestones = [
  {
    id: 1,
    name: 'Create Angular Components',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Implement Reactive Forms',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Develop Express Backend',
    status: 'In Progress'
  }
];

app.get('/', (req, res) => {
  res.send('Project Progress Tracker API is running!');
});

app.get('/api/projects', (req, res) => {
  const projects = [
    { code: 'PPT101', name: 'Project Progress Tracker' },
    { code: 'WEB202', name: 'Website Redesign' },
    { code: 'APP303', name: 'Mobile Application Development' },
    { code: 'DATA404', name: 'Data Analytics Dashboard' }
  ];

  res.json(projects);
});

// Retrieve milestone records.
app.get('/milestones', (req, res) => {
  console.log('GET request received for milestones');

  // Return milestone data as JSON.
  res.status(200).json(milestones);
});

app.post('/milestones', (req, res) => {
  const { name, status } = req.body;

  console.log('Milestone received from Angular:');
  console.log('Name:', name);
  console.log('Status:', status);

  res.status(201).json({
    message: 'Milestone submitted successfully',
    milestone: { name, status }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
