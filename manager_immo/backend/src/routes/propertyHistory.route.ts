import express from "express";
import { PropertyHistoryController } from "../controllers/propertyHistory.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const propertyHistoryRouter = express.Router();

propertyHistoryRouter.get(
	"/properties/:propertyId",
	AuthMiddleware.isConnected,
	PropertyHistoryController.findByPropertyId
);
propertyHistoryRouter.get(
	"/",
	AuthMiddleware.isConnected,
	PropertyHistoryController.findByUserId
);
propertyHistoryRouter.get(
	"/get-total-incomea",
	AuthMiddleware.isConnected,
	PropertyHistoryController.getTotalIncomea
);
propertyHistoryRouter.post(
	"/properties/:propertyId",
	AuthMiddleware.isConnected,
	PropertyHistoryController.create
);
propertyHistoryRouter.patch(
	"/:propertyHistoryId",
	AuthMiddleware.isConnected,
	PropertyHistoryController.update
);
propertyHistoryRouter.delete(
	"/:propertyHistoryId",
	AuthMiddleware.isConnected,
	PropertyHistoryController.delete
);

export default propertyHistoryRouter;
