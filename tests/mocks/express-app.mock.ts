import express, { Router } from 'express';
import { Server } from 'http';

abstract class ExpressAppMock {
  static create(router: Router): Server {
    const app = express();
    app.use(express.json());
    app.use(router);
    
    return app.listen(2137);
  }
}

export default ExpressAppMock;
