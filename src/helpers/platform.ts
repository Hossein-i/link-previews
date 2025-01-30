export function isApplePlatform(): boolean {
  return (
    /iPad|iPhone|iPod|Macintosh|MacIntel|MacPPC|Mac68K/.test(
      navigator.userAgent
    ) && !(window as any).MSStream
  );
}
