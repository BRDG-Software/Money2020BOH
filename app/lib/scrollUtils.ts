/**
 * Scroll and animation utility functions
 */

export interface ScrollState {
  scrollTop: number;
  containerHeight: number;
  isScrolling: boolean;

}

export interface ItemScaleConfig {
  itemHeight: number;
  maxDistance: number;
  scaleUpThreshold: number;
  scaleDownThreshold: number;
}

/**
 * Default configuration for item scaling
 */
export const DEFAULT_SCALE_CONFIG: ItemScaleConfig = {
  itemHeight: 180, // Approximate height of each item including gap
  maxDistance: 0.6, // Percentage of container height for max distance
  scaleUpThreshold: 0.6, // Scale factor threshold for scale-up
  scaleDownThreshold: 0.3, // Scale factor threshold for scale-down
};

/**
 * Calculate the scale class for an item based on its position relative to viewport center
 * @param index - Index of the item in the list
 * @param scrollState - Current scroll state (scrollTop and containerHeight)
 * @param config - Configuration for scaling behavior
 * @returns CSS class name for scaling
 */
export const getItemScale = (
    index: number,
    scrollState: ScrollState,
    config: ItemScaleConfig = DEFAULT_SCALE_CONFIG
  ): string => {
    const { scrollTop, containerHeight, isScrolling } = scrollState;
    
    // If not scrolling, return normal scale for all items
    if (!isScrolling) return "scale-normal";
    
    if (!containerHeight) return "scale-normal";
  
    // Calculate item position in the scroll container
    const itemTop = index * config.itemHeight;
    const itemCenter = itemTop + config.itemHeight / 2;
  
    // Calculate viewport center relative to scroll position
    const viewportCenter = scrollTop + containerHeight / 2;
  
    // Calculate distance from viewport center
    const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
    const maxDistance = containerHeight * config.maxDistance;
  
    // Create smooth scaling based on distance
    const scaleFactor = Math.max(0, 1 - distanceFromCenter / maxDistance);
  
    // Apply responsive scaling
    if (scaleFactor > config.scaleUpThreshold) return "scale-up";
    if (scaleFactor < config.scaleDownThreshold) return "scale-down";
    return "scale-normal";
  };

/**
 * Calculate scroll progress (0 to 1) based on scroll position
 * @param scrollTop - Current scroll position
 * @param scrollHeight - Total scrollable height
 * @param clientHeight - Visible height
 * @returns Progress value between 0 and 1
 */
export const getScrollProgress = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ): number => {
    const maxScroll = scrollHeight - clientHeight;
    return maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
  };

/**
 * Check if an item is in the viewport
 * @param index - Index of the item
 * @param scrollState - Current scroll state
 * @param config - Configuration for item dimensions
 * @returns True if item is visible in viewport
 */
export const isItemInViewport = (
    index: number,
    scrollState: ScrollState,
    config: ItemScaleConfig = DEFAULT_SCALE_CONFIG
  ): boolean => {
    const { scrollTop, containerHeight } = scrollState;
    
    const itemTop = index * config.itemHeight;
    const itemBottom = itemTop + config.itemHeight;
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerHeight;
  
    return itemBottom > viewportTop && itemTop < viewportBottom;
  };

/**
 * Get items that are currently visible in the viewport
 * @param totalItems - Total number of items
 * @param scrollState - Current scroll state
 * @param config - Configuration for item dimensions
 * @returns Array of visible item indices
 */
export const getVisibleItems = (
    totalItems: number,
    scrollState: ScrollState,
    config: ItemScaleConfig = DEFAULT_SCALE_CONFIG
  ): number[] => {
    const visibleItems: number[] = [];
    
    for (let i = 0; i < totalItems; i++) {
      if (isItemInViewport(i, scrollState, config)) {
        visibleItems.push(i);
      }
    }
    
    return visibleItems;
  };

/**
 * Calculate optimal scroll position to center an item
 * @param index - Index of the item to center
 * @param containerHeight - Height of the scroll container
 * @param config - Configuration for item dimensions
 * @returns Optimal scroll position
 */
export const getCenterScrollPosition = (
    index: number,
    containerHeight: number,
    config: ItemScaleConfig = DEFAULT_SCALE_CONFIG
  ): number => {
    const itemTop = index * config.itemHeight;
    const itemCenter = itemTop + config.itemHeight / 2;
    return Math.max(0, itemCenter - containerHeight / 2);
  };

/**
 * Smooth scroll to a specific item
 * @param element - The scrollable element
 * @param index - Index of the item to scroll to
 * @param containerHeight - Height of the scroll container
 * @param config - Configuration for item dimensions
 * @param duration - Animation duration in milliseconds
 */
export const smoothScrollToItem = (
    element: HTMLElement,
    index: number,
    containerHeight: number,
    config: ItemScaleConfig = DEFAULT_SCALE_CONFIG,
    duration: number = 500
  ): void => {
    const targetScrollTop = getCenterScrollPosition(index, containerHeight, config);
    
    const startScrollTop = element.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      element.scrollTop = startScrollTop + distance * easeOut;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };
