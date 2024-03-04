import express from "express";
import authRouter from "./auth.route"
import propertyRouter from "./property.route"
import propertyHistoryRouter from "./propertyHistory.route";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/properties", propertyRouter)
appRouter.use("/propertyHistory", propertyHistoryRouter)

export default appRouter;
