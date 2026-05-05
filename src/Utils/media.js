import { BASE_URL } from "../Config/AppConstant";

const DEV_API_URL = process.env.REACT_APP_DEV_API_URL || "http://172.104.206.4:5000/api";

const resolveMediaBaseUrl = () => {
  if (typeof window === "undefined") {
    return BASE_URL;
  }

  const host = window.location.hostname;

  if (host === "localhost" || host === "127.0.0.1") {
    return DEV_API_URL.replace(/\/api$/, "");
  }

  return BASE_URL;
};

const extractAssetValue = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return extractAssetValue(value[0]);
  }

  if (typeof value === "object") {
    return (
      value.url ||
      value.path ||
      value.src ||
      value.icon ||
      value.image ||
      value.filename ||
      value.fileName ||
      value.secure_url ||
      null
    );
  }

  return null;
};

export const resolveAssetUrl = (value, uploadsFolder = "uploads") => {
  const asset = extractAssetValue(value);
  const mediaBaseUrl = resolveMediaBaseUrl();

  if (!asset) {
    return null;
  }

  const normalizedAsset = String(asset).trim().replace(/\\/g, "/");

  if (!normalizedAsset) {
    return null;
  }

  // Some API rows contain a duplicated host prefix like:
  // http://hosthttps://real-image-url
  const secondHttpIndex = normalizedAsset.indexOf("http://", 7) >= 0
    ? normalizedAsset.indexOf("http://", 7)
    : normalizedAsset.indexOf("https://", 8);
  const cleanedAsset = secondHttpIndex > 0 ? normalizedAsset.slice(secondHttpIndex) : normalizedAsset;

  if (/^https?:\/\//i.test(cleanedAsset)) {
    return cleanedAsset;
  }

  if (cleanedAsset.startsWith("//")) {
    return `https:${cleanedAsset}`;
  }

  if (cleanedAsset.startsWith("/")) {
    return `${mediaBaseUrl}${cleanedAsset}`;
  }

  if (cleanedAsset.startsWith(`${uploadsFolder}/`)) {
    return `${mediaBaseUrl}/${cleanedAsset}`;
  }

  return `${mediaBaseUrl}/${uploadsFolder}/${cleanedAsset.replace(/^\/+/, "")}`;
};
