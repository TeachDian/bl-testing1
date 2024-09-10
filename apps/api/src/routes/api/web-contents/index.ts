import express from "express";
import {
  addActivity,
  addActivityPhoto,
  deleteActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} from "./services/activities";
import {
  addEvent,
  addEventPhoto,
  deleteEvent,
  getEventById,
  updateEvent,
  updateEventStatus,
} from "./services/events";
import {
  addNews,
  addNewsPhoto,
  deleteNews,
  getAllNews,
  getNewsById,
  updateNews,
  updateNewsStatus,
} from "./services/news";
import {
  addVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
} from "./services/videos";
import {
  addAboutUs,
  deletedAboutUs,
  getAboutUs,
  updateAboutUs,
} from "./services/aboutUs";
import {
  addBillboard,
  addBillboardPhoto,
  deleteBillboard,
  getAllBillboards,
  getBillboardById,
  updateBillboard,
  updateBillboardStatus,
} from "./services/billboards";
import {
  addSlider,
  addSliderPhoto,
  deleteSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
  updateSliderStatus,
} from "./services/sliders";
import { getWebContents } from "./services/default";
import {
  addSocialLinks,
  deleteSocialLinks,
  getSocialLinksById,
  updateSocialLinks,
} from "./services/social";

const router = express.Router();

router.get("/", getWebContents);

// about-us
router.get("/about-us", getAboutUs);
router.post("/about-us", addAboutUs);
router.patch("/about-us", updateAboutUs);
router.delete("/about-us", deletedAboutUs);

// activities
router.get("/activities", getAllActivities);
router.get("/activities/:activityId", getActivityById);
router.post("/activities", addActivity);
router.patch("/activities/:activityId", updateActivity);
router.delete("/activities/:activityId", deleteActivity);
router.post("/activities/:activityId/photo", addActivityPhoto);

// billboards
router.get("/billboards", getAllBillboards);
router.get("/billboards/:billboardId", getBillboardById);
router.post("/billboards", addBillboard);
router.patch("/billboards/:billboardId", updateBillboard);
router.delete("/billboards/:billboardId", deleteBillboard);
router.post("/billboards/:billboardId/photo", addBillboardPhoto);
router.patch("/billboards/:billboardId/status", updateBillboardStatus);

// events
router.get("/events", getAllActivities);
router.get("/events/:eventId", getEventById);
router.post("/events", addEvent);
router.patch("/events/:eventId", updateEvent);
router.delete("/events/:eventId", deleteEvent);
router.post("/events/:eventId/photo", addEventPhoto);
router.patch("/events/:eventId/status", updateEventStatus);

// news
router.get("/news", getAllNews);
router.get("/news/:newsId", getNewsById);
router.post("/news", addNews);
router.patch("/news/:newsId", updateNews);
router.delete("/news/:newsId", deleteNews);
router.post("/news/:newsId/photo", addNewsPhoto);
router.patch("/news/:newsId/status", updateNewsStatus);

// sliders
router.get("/sliders", getAllSliders);
router.get("/sliders/:sliderId", getSliderById);
router.post("/sliders", addSlider);
router.patch("/sliders/:sliderId", updateSlider);
router.delete("/sliders/:sliderId", deleteSlider);
router.post("/sliders/:sliderId/photo", addSliderPhoto);
router.patch("/sliders/:sliderId/status", updateSliderStatus);

// videos
router.get("/videos", getAllVideos);
router.get("/videos/:videoId", getVideoById);
router.post("/videos", addVideo);
router.patch("/videos/:videoId", updateVideo);
router.delete("/videos/:videoId", deleteVideo);

// social links
router.get("/social-links/:socialId", getSocialLinksById);
router.post("/social-links", addSocialLinks);
router.patch("/social-links/:socialId", updateSocialLinks);
router.delete("/social-links/:socialId", deleteSocialLinks);

export default router;
