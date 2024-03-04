import express from "express";
import { PropertyController } from "../controllers/property.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const propertyRouter = express.Router();

propertyRouter.get(
	"/:propertyId",
	AuthMiddleware.isConnected,
	PropertyController.findById
);
propertyRouter.get("/", AuthMiddleware.isConnected, PropertyController.findAll);
propertyRouter.get("/with/incomea", AuthMiddleware.isConnected, PropertyController.findAllWithIncomea);
propertyRouter.post("/", AuthMiddleware.isConnected, PropertyController.create);
propertyRouter.patch(
	"/:propertyId",
	AuthMiddleware.isConnected,
	PropertyController.update
);
propertyRouter.delete(
	"/:propertyId",
	AuthMiddleware.isConnected,
	PropertyController.delete
);

export default propertyRouter;
