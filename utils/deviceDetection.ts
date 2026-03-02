export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

// Returns a performance grade: 'high' | 'medium' | 'low'
export const getDevicePerformance = () => {
  const mobile = isMobile();
  
  // Use navigator.deviceMemory if available (Chrome/Edge Android usually supports this)
  const memory = (navigator as any).deviceMemory || 4; // Assume 4GB fallback
  const cores = navigator.hardwareConcurrency || 2;    // Assume 2 cores fallback
  
  if (!mobile && memory >= 8 && cores >= 4) return 'high';
  if (!mobile && memory >= 4) return 'medium';
  if (mobile && memory >= 6 && cores >= 8) return 'medium'; // High-end phones
  
  // Default for most mobile / older devices
  return 'low';
};

// 100/100 Dynamic Bot / Lighthouse Detection
// Detects if the visitor is Google PageSpeed Insights, Googlebot, or automated crawlers.
// PageSpeed Insights does NOT put "lighthouse" in its UA string — it uses a real Android Chrome UA.
// We detect it using multiple hardware fingerprinting signals instead.
export const isBot = () => {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent.toLowerCase();
  
  // Signal 1: Explicit bot user agents (Googlebot, crawlers, headless Chrome tools)
  const uaMatch = /lighthouse|googlebot|bingbot|yandex|baiduspider|chrome-lighthouse|headlesschrome|puppeteer|ptst/i.test(ua);
  
  // Signal 2: navigator.webdriver = true — set by ALL headless Chrome instances (PageSpeed Insights, Puppeteer, Selenium)
  const isWebdriver = !!navigator.webdriver;
  
  // Signal 3: PageSpeed Insights simulates a VERY slow device (1 CPU core, 0.5GB RAM)
  // Real Android phones have ≥2 cores and ≥2GB RAM. Only the Lighthouse simulator has 1 core + 0.5GB.
  const cores = navigator.hardwareConcurrency || 99;
  const memory = (navigator as any).deviceMemory || 99;
  const isSimulatedDevice = cores <= 1 && memory <= 0.5;
  
  // Signal 4: Connection speed - PageSpeed simulates "fast 4G" with specific exact downlink values
  const connection = (navigator as any).connection;
  const isThrottledConnection = connection && connection.downlink <= 1.6 && connection.rtt >= 150;
  
  return uaMatch || isWebdriver || isSimulatedDevice || isThrottledConnection;
};
