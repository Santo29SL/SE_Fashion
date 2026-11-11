/** Use a project-local fallback when a Lovable-hosted asset URL is unavailable in local dev. */
export function localAssetUrl(assetUrl: string, localFallback: string): string {
  return assetUrl.startsWith("/__l5e/") ? localFallback : assetUrl;
}
