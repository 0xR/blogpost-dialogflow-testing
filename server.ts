import { createServer } from './create-server';

createServer().listen(3000, () => {
  console.log('listening on localhost:3000');
});
