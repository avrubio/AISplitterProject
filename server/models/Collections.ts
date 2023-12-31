import { CollectionNotFoundError } from "../errors/CollectionNotFoundError";

export interface ICollection {
  id: number;
  userId: string;
  name: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Collections {
  private _collections: ICollection[] = [];
  private _id = 0;

  getAll() {
    return this._collections;
  }

  create(userId: string, collectionName: string) {
    this._id++;
    const collection = {
      id: this._id,
      userId,
      name: collectionName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._collections.push(collection);

    return { ...collection };
  }

  listAllByUser(userId: string) {
    return this._collections.filter(
      (collection) => collection.userId === userId
    );
  }

  getByIdAndUser(userId: string, collectionId: number) {
    const collection = this.listAllByUser(userId).find(
      (collection) => collection.id === collectionId
    );

    if (!collection) throw new CollectionNotFoundError();

    return { ...collection };
  }

  private _getIndex(userId: string, collectionId: number) {
    const ids = this._collections.map((collection) => collection.id);
    const idx = ids.findIndex((id) => id === collectionId);

    if (idx < 0 || this._collections[idx].userId !== userId)
      throw new CollectionNotFoundError();

    return idx;
  }

  editCollectionName(
    userId: string,
    collectionId: number,
    collectionName: string
  ) {
    const idx = this._getIndex(userId, collectionId);

    this._collections[idx] = {
      ...this._collections[idx],
      name: collectionName,
      updatedAt: new Date(),
    };

    return { ...this._collections[idx] };
  }

  deleteCollection(userId: string, collectionId: number) {
    this._getIndex(userId, collectionId);

    this._collections = this._collections.filter((collection) => {
      return collection.id !== collectionId;
    });
  }

  clear() {
    this._collections = [];
    this._id = 0;
  }

  addText(userId: string, collectionId: number, text: string) {
    const idx = this._getIndex(userId, collectionId);

    this._collections[idx].text = text;
    this._collections[idx] = {
      ...this._collections[idx],
      updatedAt: new Date(),
    };

    return { ...this._collections[idx] };
  }
}

export const collections = new Collections();
