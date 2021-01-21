const { v4: uuidv4 } = require('uuid');

let jobs = [
  {
    id: 123,
    title: 'job A',
    description: 'This is a fake job',
    email: 'jobsa@jobs.com',
    created: 1611254560294,
  },
  {
    id: 456,
    title: 'job B',
    description: 'This is a fake job',
    email: 'jobsb@jobs.com',
    created: 1611254580173,
  },
  {
    id: 789,
    title: 'job C',
    description: 'This is a fake job',
    email: 'jobsc@jobs.com',
    created: 1611254587496,
  }
];

exports.createJob = (title, description, email) => {
  if(title == null || description == null || email == null) {
    throw new Error('Missing either title, description or email.');
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    throw new Error(`Email address '${email}' invalid.`);
  }
  const id = uuidv4();
  jobs.push({
    id,
    title,
    description,
    email,
    created: Date.now(),
  });
  return id;
};

exports.retrieveJobs = () => {
  return jobs;
};

exports.retrieveJob = (id) => {
  if(id == null) {
    throw new Error('Missing id.');
  }
  return jobs.find((job) => job.id === id);
};

exports.updateJob = (id, title, description, email) => {
  if(id == null || title == null || description == null || email == null) {
    throw new Error('Missing either id, title, description or email.');
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    throw new Error(`Email address '${email}' invalid.`);
  }
  jobs = jobs.map((job) => {
    if(job.id === id) {
      return {
        ...job,
        title,
        description,
        email,
      };
    }
    return job;
  });
};

exports.deleteJob = (id) => {
  if(id == null) {
    throw new Error('Missing id.');
  }
  jobs = jobs.filter((job) => job.id !== id);
};
