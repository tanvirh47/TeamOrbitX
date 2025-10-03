import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8000),
  MYSQL_HOST: z.string().default("localhost"),
  MYSQL_PORT: z.coerce.number().int().positive().default(3306),
  MYSQL_USER: z.string().default("root"),
  MYSQL_PASSWORD: z.string().default(""),
  MYSQL_DATABASE: z.string().default("orbitx_dashboard"),
  MYSQL_CONNECTION_LIMIT: z.coerce.number().int().positive().default(10),
  EARTHDATA_USERNAME: z.string().optional(),
  EARTHDATA_PASSWORD: z.string().optional(),
  LAADS_TOKEN: z.string().optional(),
  MODIS_COLLECTION: z.string().default("61"),
  MODIS_PRODUCT: z.string().default("MOD11A1"),
  MODIS_DAYS_BACK: z.coerce.number().int().positive().default(1),
  MODIS_STORAGE_DIR: z.string().default("./data/modis"),
  SRTM_DATASET: z.string().default("SRTMGL1.003"),
  SRTM_RELEASE: z.string().default("2015.02.25"),
  SRTM_STORAGE_DIR: z.string().default("./data/srtm"),
  GIBS_LAYER: z.string().default("BlueMarble_NextGeneration"),
  GIBS_TILE_MATRIX_SET: z.string().default("GoogleMapsCompatible_Level9"),
  GIBS_TIME: z.string().default("default"),
  GIBS_IMAGE_FORMAT: z.string().default("jpg"),
});

const parsed = envSchema.parse(process.env);

export const env = {
  nodeEnv: parsed.NODE_ENV,
  port: parsed.PORT,
  mysql: {
    host: parsed.MYSQL_HOST,
    port: parsed.MYSQL_PORT,
    user: parsed.MYSQL_USER,
    password: parsed.MYSQL_PASSWORD,
    database: parsed.MYSQL_DATABASE,
    connectionLimit: parsed.MYSQL_CONNECTION_LIMIT,
  },
  nasa: {
    earthdataUsername: parsed.EARTHDATA_USERNAME,
    earthdataPassword: parsed.EARTHDATA_PASSWORD,
    laadsToken: parsed.LAADS_TOKEN,
    modis: {
      collection: parsed.MODIS_COLLECTION,
      product: parsed.MODIS_PRODUCT,
      daysBack: parsed.MODIS_DAYS_BACK,
      storageDir: parsed.MODIS_STORAGE_DIR,
    },
    srtm: {
      dataset: parsed.SRTM_DATASET,
      release: parsed.SRTM_RELEASE,
      storageDir: parsed.SRTM_STORAGE_DIR,
    },
    gibs: {
      layer: parsed.GIBS_LAYER,
      tileMatrixSet: parsed.GIBS_TILE_MATRIX_SET,
      time: parsed.GIBS_TIME,
      imageFormat: parsed.GIBS_IMAGE_FORMAT,
    },
  },
};

export const isProduction = env.nodeEnv === "production";
