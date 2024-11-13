import request from 'supertest';
import { application, Shutdown } from '../../src/server';

describe('Our Application', () => {
    afterAll((done) => {
        Shutdown(done);
    });
    it('starts amd has proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);
});
