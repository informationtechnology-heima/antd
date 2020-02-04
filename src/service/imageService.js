import httpUtils from '../utils/httputils'

class ImageService {
    findAll = (page) => {
        return httpUtils.get("/images/findByType?" + "type=" + page.type + "&index=" + page.index + "&size=" + page.size)
    }
}

const imageService = new ImageService();
export default imageService;