import { TagModel, Tags } from "../Tags/models";

export const getAllTags = (): Promise<Tags[] | null> => {
  return TagModel.find();
};
