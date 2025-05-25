import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { productRouter } from "./productRouter.js";
import { userRouter } from "./userRouter.js";

export const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);