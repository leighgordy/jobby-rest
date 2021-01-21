const {
  retrieveJobs,
  retrieveJob,
  deleteJob,
  createJob,
  updateJob,
} = require('../../src/datalayer/fake-database');

describe('fake-database.test.js', ()=>{
  test('retrieveJobs', () => {
    expect(retrieveJobs()).toStrictEqual([
      {
        created: 1611254560294,
        description: 'This is a fake job',
        email: 'jobsa@jobs.com',
        id: 123,
        title: 'job A'
      },
      {
        created: 1611254580173,
        description: 'This is a fake job',
        email: 'jobsb@jobs.com',
        id: 456,
        title: 'job B'
      },
      {
        created: 1611254587496,
        description: 'This is a fake job',
        email: 'jobsc@jobs.com',
        id: 789,
        title: 'job C',
      }
    ]);
  });

  describe('retrieveJob', () => {
    test('successful call', () => {
      expect(retrieveJob(789)).toStrictEqual({
        'created': 1611254587496,
        'description': 'This is a fake job',
        'email': 'jobsc@jobs.com',
        'id': 789,
        'title': 'job C',
      });
    });
    test('successful call wrong id', () => {
      expect(retrieveJob(666)).toBeUndefined();
    });
    test('failed call missing id', (done) => {
      try {
        retrieveJob(null);
        done.fail();
      } catch(err){
        expect(err.message).toBe('Missing id.');
        done();
      }
    });
  });

  describe('deleteJob', () => {
    test('successful call', () => {
      deleteJob(789);
      expect(retrieveJob(789)).toBeUndefined();
    });
    test('successful call wrong id', () => {
      deleteJob(999);
      expect(retrieveJob(999)).toBeUndefined();
    });
    test('failed call missing id', (done) => {
      try {
        deleteJob(null);
        done.fail();
      } catch(err){
        expect(err.message).toBe('Missing id.');
        done();
      }
    });
  });

  describe('createJob', () => {
    test('successful call', () => {
      const id = createJob('newTitle', 'new description', 'newemail@newemail.com');
      expect(id).not.toBeUndefined();
      const newRecord = retrieveJob(id);
      expect(newRecord).toMatchObject({
        description: 'new description',
        email: 'newemail@newemail.com',
        title: 'newTitle',
      });
      expect(newRecord.id).not.toBeUndefined();
    });
    test('failed call missing title', (done) => {
      try {
        createJob(null, 'new description', 'newemail@newemail.com');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call missing description', (done) => {
      try {
        createJob('newTitle', null, 'newemail@newemail.com');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call missing email', (done) => {
      try {
        createJob('newTitle', 'new description', null);
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either title, description or email.');
        done();
      }
    });
    test('failed call invalid email', (done) => {
      try {
        createJob('newTitle', 'new description', 'newemailnewemailcom');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Email address \'newemailnewemailcom\' invalid.');
        done();
      }
    });
  });

  describe('updateJob', () => {
    let id = null;
    beforeAll(() => {
      id = createJob('updateMe', 'needs updating', 'oldemail@oldemail.com');
      expect(id).not.toBeUndefined();
    });

    test('successful call', () => {
      updateJob(id, 'updated', 'recently updated', 'updatedemail@updatedemail.com');
      const newRecord = retrieveJob(id);
      expect(newRecord).toMatchObject({
        description: 'recently updated',
        email: 'updatedemail@updatedemail.com',
        title: 'updated',
      });
      expect(newRecord.id).toBe(id);
    });

    test('failed call missing id', (done) => {
      try {
        updateJob(null, 'updated', 'recently updated', 'updatedemail@updatedemail.com');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing title', (done) => {
      try {
        updateJob(id, null, 'recently updated', 'updatedemail@updatedemail.com');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing description', (done) => {
      try {
        updateJob(id, 'updated', null, 'updatedemail@updatedemail.com');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });

    test('failed call missing email', (done) => {
      try {
        updateJob(id, 'updated', 'recently updated', null);
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Missing either id, title, description or email.');
        done();
      }
    });
    test('failed call invalid email', (done) => {
      try {
        updateJob(id, 'updated', 'recently updated', 'updatedemailupdatedemailcom');
        done.fail();
      } catch(err) {
        expect(err.message).toBe('Email address \'updatedemailupdatedemailcom\' invalid.');
        done();
      }
    });
  });
});
