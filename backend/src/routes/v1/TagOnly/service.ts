import {
    getAllTags
} from "./repository";

const TagsOnlyService = {
 
  async getAllTags() {
    return getAllTags();
  },
};
export default TagsOnlyService;
