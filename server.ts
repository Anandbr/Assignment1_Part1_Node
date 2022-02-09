import express, {Request, Response} from 'express';
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";

const dbconnect = 'mongodb+srv://anand:anand@cluster0.pstb3.mongodb.net/FSEDatabase?retryWrites=true&w=majority'
mongoose.connect(dbconnect);

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app)
const tuitController = TuitController.getInstance(app)

const PORT = 4000;

app.listen(process.env.PORT || PORT);