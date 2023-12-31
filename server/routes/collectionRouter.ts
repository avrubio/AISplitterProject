import express, { Request, Response } from "express";
import { ICollection, collections } from "../models/Collections";
import { CollectionNotFoundError } from "../errors/CollectionNotFoundError";
import methodNotAllowedError from "./errors/methodNotAllowed";
import { getUserId, auth } from "../middlewares/auth";

const router = express.Router();
router.use(getUserId);
router.use(auth);

const handleErrors = (
  collectionId: string,
  res: Response,
  fn: Function
): Response | undefined => {
  try {
    return fn();
  } catch (err) {
    if (err?.constructor === CollectionNotFoundError) {
      return res.status(404).send({
        message: `No collection with id ${collectionId} found`,
      });
    }
    console.log(err);
    throw err;
  }
};

router
  .route("/:collectionId/text")
  .post((req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId, text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).send({
        message: 'You need to include a block of text as "text"',
      });
    }

    return handleErrors(collectionId, res, () => {
      const collection = collections.addText(
        userId,
        parseInt(collectionId),
        text
      );
      return res.send(collection);
    });
  })
  .all(methodNotAllowedError);

router
  .route("/:collectionId")
  .get((req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId } = req.body;
    return handleErrors(collectionId, res, () => {
      const collection = collections.getByIdAndUser(
        userId,
        parseInt(collectionId)
      );
      return res.send(collection);
    });
  })
  .put((req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId, name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).send({
        message: 'You need to include a new "name" for your collection',
      });
    }

    return handleErrors(collectionId, res, () => {
      const collection = collections.editCollectionName(
        userId,
        parseInt(collectionId),
        name
      );
      return res.send(collection);
    });
  })
  .delete((req: Request, res: Response) => {
    const { collectionId } = req.params;
    const { userId } = req.body;
    return handleErrors(collectionId, res, () => {
      collections.deleteCollection(userId, parseInt(collectionId));
      return res.status(204).send();
    });
  })
  .all(methodNotAllowedError);

router
  .route("/")
  .get((req: Request, res: Response) => {
    const { userId } = req.body;
    const userCollections = collections.listAllByUser(userId);
    return res.send(userCollections);
  })
  .post((req: Request, res: Response) => {
    const { userId, name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).send({
        message: 'You need to include a "name" for your collection',
      });
    }

    const collection = collections.create(userId, name);
    return res.status(201).send(collection);
  })
  .all(methodNotAllowedError);

export default router;
