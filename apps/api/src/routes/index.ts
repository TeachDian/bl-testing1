import { Application } from "express";
import { API_ROOT } from "@/common/constants";
import assetsRoute from "./assets";
import webContentsRoute from "./api/web-contents";
import breederSettingsRoute from "./api/breeder-settings";
import microchipRoute from "./api/microchip";
import breederModuleRoute from "./api/breeder-module";

export default function (app: Application) {
  app.use(`/assets`, assetsRoute);
  app.use(`${API_ROOT}/web-contents`, webContentsRoute);
  app.use(`${API_ROOT}/breeder-settings`, breederSettingsRoute);
  app.use(`${API_ROOT}/microchip`, microchipRoute);
  app.use(`${API_ROOT}/breeder-module`, breederModuleRoute);
}
