import { Router } from "express";
import AuthService from "./auth.service";
import { validation } from "../../middlewares/Validation.middleware";
import * as validators from "./auth.validation";
const router = Router();

router.post("/signup", validation(validators.signup), AuthService.signup);

export default router;
