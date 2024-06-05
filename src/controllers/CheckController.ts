import { Request, Response } from "express";

class CheckController {

  check = async (req: Request, res: Response) => {
    try {
      const user = res.locals.user;
      res.status(200).json(user);
    } catch (error) {
      console.error("Error checking user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default CheckController;