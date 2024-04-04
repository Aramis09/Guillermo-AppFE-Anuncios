export interface ImageData {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_extension: string;
  original_filename: string;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: [];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

export interface ResultCloudinary {
  event: "display-changed" | "success";
  info: ImageData;
}

export interface GetImagesFromCloudinary {
  images: Images;
}

export interface Images {
  resources: ImageCloudinaryDetail[];
  updated_at: Date;
}

export interface ImageCloudinaryDetail {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: Date;
}
