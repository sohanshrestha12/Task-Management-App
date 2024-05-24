import CustomError from "../../../utils/Error";
import { addTagsToTask, removeTagFromTask } from "../Task/repository";
import { Tags } from "./models";
import { createTags, editTag, getTag, removeTag } from "./repository";

const TagsService = {
  async createTags(data: Tags, taskId: string, userId: string) {
    const tag = await createTags(data, userId);
    await addTagsToTask(taskId, tag._id.toString());
    return tag;
  },
  async getTagById(id: string) {
    const tag = await getTag(id);
    if (!tag) {
      throw new CustomError("Tag not found", 404);
    }
    return tag;
  },
  async updateTags(body: Partial<Tags>, id: string, userId: string) {
    await this.getTagById(id);
    const res = await editTag(body, id, userId);
    if (!res) throw new CustomError("You cannot edit this tag", 403);
    return res;
  },

  async deleteTag(id: string, taskID: string, user: string) {
    await this.getTagById(id);
    const res = await removeTag(id, user);
    if (!res) {
      throw new CustomError("Forbidden to delete this Tag", 403);
    }
    const removeTagTask = await removeTagFromTask(id, taskID);
    return { res, removeTagTask };
  },
};
export default TagsService;
