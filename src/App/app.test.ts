/* tests for the APP */
import { app } from './app';
import request from 'supertest';

describe('Tests for application mongoose connections / emitters', () => {
  it('Checks if connectDB() call in app.ts /* Mongoose setup section */ returns true if connected', () => {
    request(app)
      .get('/')
      .expect(200, (req, res) => {
        expect(req.app.locals.DBisConnected).toBe(true);
      });
  });
});
