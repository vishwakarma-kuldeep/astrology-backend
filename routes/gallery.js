const Gallery = require("../controllers/gallery");
const { authenticateToken } = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/adminmiddleware");
const { checkFolder, checkValidvideo } = require("../middlewares/gallery");
const { checkValidSubscription } = require("../middlewares/subscription");
const { checkUser } = require("../middlewares/user");
const router = require("express").Router();

router.use(authenticateToken);

router.post("/create", [checkAdmin], Gallery.addFolder);
router.get("/get", Gallery.getFolders);
router.get("/get/:id", [checkFolder], Gallery.getFolder);

router.post("/update/:id", [checkAdmin, checkFolder], Gallery.updateFolder);
router.post("/delete/:id", [checkAdmin, checkFolder], Gallery.deleteFolder);
router.post("/add-video/:id", [checkAdmin, checkFolder], Gallery.addVideo);
router.post(
  "/delete-video/:id",
  [checkAdmin, checkValidvideo],
  Gallery.deleteVideo,
);
router.post(
  "/update-video/:id",
  [checkAdmin, checkValidvideo],
  Gallery.updateVideo,
);

router.get(
  "/get-videos/:id",
  [checkUser, checkFolder, checkValidSubscription],
  Gallery.getVideos,
);
router.get(
  "/get-video/:id",
  [checkValidvideo, checkValidSubscription],
  Gallery.getVideo,
);
router.get("/get-all-videos", [checkAdmin], Gallery.getAllVideos);
module.exports = router;
