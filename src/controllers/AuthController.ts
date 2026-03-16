import type { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);
    res.status(201).json(user);
  };

  login = async (req: Request, res: Response) => {
    const tokens = await this.authService.login(req.body);
    res.json(tokens);
  };

  refresh = async (req: Request, res: Response) => {
    const tokens = await this.authService.refresh(req.body.refreshToken);
    res.json(tokens);
  };

  logout = async (req: Request, res: Response) => {
    await this.authService.logout(req.user!.id);
    res.status(204).send();
  };
}
