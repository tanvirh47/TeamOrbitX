import express from "express";
import path from "path";
import { promises as fs } from "fs";

const router = express.Router();

/**
 * Serve pre-generated raster tiles for any risk layer
 */
router.get("/tiles/:layer/:z/:x/:y.png", async (req, res) => {
  const { layer, z, x, y } = req.params;
  const filePath = path.join(__dirname, "../../tiles", layer, z, x, `${y}.png`);
  
  try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch {
    res.status(404).send("Tile not found");
  }
});

export default router;
