import { Request, Response, Router, NextFunction } from "express";
import { TodoService } from '../services/todo.service';

export class TodoController {
  public router = Router();
  
  constructor(private todoService: TodoService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.sayHello).get(this.findAll);

    this.router.route("/all").get(this.findAll);
    
    this.router.route("/add").post(this.add);

    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private sayHello = (req: Request, res: Response, next: NextFunction) => {
    const welcome = this.todoService.getWelcomeMessage();
    res.send(welcome);
  }

  private findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceRes = await this.todoService.findAll();
      res.send(serviceRes);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send({name: e.name, message: e.message});
      } else {
        res.status(500).send('Error!!');
      }
    }
  }

  private add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceRes = await this.todoService.add(req.body);
      res.send(serviceRes);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send({name: e.name, message: e.message});
      } else {
        res.status(500).send('Error!!');
      }
    }
  }

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceRes = await this.todoService.delete(
        req.params.id
      );
      res.send(serviceRes);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send({name: e.name, message: e.message});
      } else {
        res.status(500).send('Error!!');
      }
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceRes = await this.todoService.update(
        req.params.id,
        req.body
      );
      res.send(serviceRes);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send({ name: e.name, message: e.message });
      } else {
        res.status(500).send('Error!!');
      }
    }
  };
}