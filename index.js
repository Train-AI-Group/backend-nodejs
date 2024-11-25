import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';
import { getDatabaseConnection } from './database/connect.js';
const app = express();

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(bodyParser.json());

app.use('/auth', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
