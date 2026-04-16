# Hooks Documentation

This document explains all the custom hooks created for the Pizza Builder application.

## State Management Hooks

### useToggleState
A hook for managing boolean state with toggle functionality.

```javascript
import useToggleState from './hooks/useToggleState';

const [isToggled, { toggle, setTrue, setFalse }] = useToggleState(false);
```

### useCounterState
A hook for managing numeric state with increment, decrement, and reset functionality.

```javascript
import useCounterState from './hooks/useCounterState';

const [count, { increment, decrement, reset, set }] = useCounterState(0, 1);
```

### useArrayState
A hook for managing array state with common array operations.

```javascript
import useArrayState from './hooks/useArrayState';

const [array, { push, filter, update, remove, clear, isEmpty }] = useArrayState([]);
```

### useObjectState
A hook for managing object state with update and remove operations.

```javascript
import useObjectState from './hooks/useObjectState';

const [state, { update, updateMultiple, remove, clear }] = useObjectState({});
```

## Browser API Hooks

### useLocalStorageState
A hook for managing state in localStorage.

```javascript
import useLocalStorageState from './hooks/useLocalStorageState';

const [value, setValue] = useLocalStorageState('key', 'defaultValue');
```

### useSessionStorageState
A hook for managing state in sessionStorage.

```javascript
import useSessionStorageState from './hooks/useSessionStorageState';

const [value, setValue] = useSessionStorageState('key', 'defaultValue');
```

### useOnlineState
A hook for tracking online/offline status.

```javascript
import useOnlineState from './hooks/useOnlineState';

const isOnline = useOnlineState();
```

### useWindowSizeState
A hook for tracking window size changes.

```javascript
import useWindowSizeState from './hooks/useWindowSizeState';

const { width, height } = useWindowSizeState();
```

### useScrollPositionState
A hook for tracking scroll position.

```javascript
import useScrollPositionState from './hooks/useScrollPositionState';

const { x, y } = useScrollPositionState();
```

### useDocumentVisibilityState
A hook for tracking document visibility.

```javascript
import useDocumentVisibilityState from './hooks/useDocumentVisibilityState';

const isVisible = useDocumentVisibilityState();
```

### useBatteryState
A hook for accessing battery status (if supported).

```javascript
import useBatteryState from './hooks/useBatteryState';

const { level, charging, chargingTime, dischargingTime } = useBatteryState();
```

### useNetworkState
A hook for accessing network information.

```javascript
import useNetworkState from './hooks/useNetworkState';

const { online, downlink, effectiveType, rtt } = useNetworkState();
```

### useGeolocationState
A hook for accessing geolocation information.

```javascript
import useGeolocationState from './hooks/useGeolocationState';

const { latitude, longitude, error, loading } = useGeolocationState();
```

### useNotificationState
A hook for managing notification permissions.

```javascript
import useNotificationState from './hooks/useNotificationState';

const { permission, requestPermission, isSupported } = useNotificationState();
```

### useIdleState
A hook for detecting user idle state.

```javascript
import useIdleState from './hooks/useIdleState';

const isIdle = useIdleState(300000); // 5 minutes
```

### useVisibilityState
A hook for tracking element visibility.

```javascript
import useVisibilityState from './hooks/useVisibilityState';

const isVisible = useVisibilityState();
```

### useScrollDirectionState
A hook for tracking scroll direction.

```javascript
import useScrollDirectionState from './hooks/useScrollDirectionState';

const scrollDirection = useScrollDirectionState(10); // threshold
```

### useScrollToTopState
A hook for showing/hiding scroll to top button.

```javascript
import useScrollToTopState from './hooks/useScrollToTopState';

const { showScrollTop, scrollToTop } = useScrollToTopState(300); // threshold
```

### useDarkModeState
A hook for managing dark mode preference.

```javascript
import useDarkModeState from './hooks/useDarkModeState';

const [isDarkMode, toggleDarkMode] = useDarkModeState();
```

### useThemeState
A hook for managing theme preference.

```javascript
import useThemeState from './hooks/useThemeState';

const [theme, toggleTheme] = useThemeState();
```

### usePrefersReducedMotionState
A hook for detecting reduced motion preference.

```javascript
import usePrefersReducedMotionState from './hooks/usePrefersReducedMotionState';

const prefersReducedMotion = usePrefersReducedMotionState();
```

### usePrefersDarkModeState
A hook for detecting dark mode preference.

```javascript
import usePrefersDarkModeState from './hooks/usePrefersDarkModeState';

const prefersDarkMode = usePrefersDarkModeState();
```

### useFaviconState
A hook for changing the favicon.

```javascript
import useFaviconState from './hooks/useFaviconState';

useFaviconState('/path/to/favicon.ico');
```

### useTitleState
A hook for changing the document title.

```javascript
import useTitleState from './hooks/useTitleState';

useTitleState('New Title');
```

### usePageLeaveState
A hook for detecting when the mouse leaves the page.

```javascript
import usePageLeaveState from './hooks/usePageLeaveState';

usePageLeaveState(() => {
  // Handle page leave
});
```

### useMousePositionState
A hook for tracking mouse position.

```javascript
import useMousePositionState from './hooks/useMousePositionState';

const { x, y } = useMousePositionState();
```

### useKeyPressComboState
A hook for detecting key press combinations.

```javascript
import useKeyPressComboState from './hooks/useKeyPressComboState';

const isPressed = useKeyPressComboState(['Control', 'Shift', 'A']);
```

### useLockBodyScrollState
A hook for locking body scroll.

```javascript
import useLockBodyScrollState from './hooks/useLockBodyScrollState';

useLockBodyScrollState(true);
```

### useThrottleState
A hook for throttling value updates.

```javascript
import useThrottleState from './hooks/useThrottleState';

const throttledValue = useThrottleState(value, 1000); // 1 second
```

### useDebounceState
A hook for debouncing value updates.

```javascript
import useDebounceState from './hooks/useDebounceState';

const debouncedValue = useDebounceState(value, 500); // 500ms
```

### useClickOutsideState
A hook for detecting clicks outside an element.

```javascript
import useClickOutsideState from './hooks/useClickOutsideState';

const ref = useClickOutsideState(() => {
  // Handle click outside
});
```

### useAsyncState
A hook for managing async operations.

```javascript
import useAsyncState from './hooks/useAsyncState';

const { execute, status, value, error } = useAsyncState(asyncFunction);
```

### useFetchState
A hook for fetching data from an API.

```javascript
import useFetchState from './hooks/useFetchState';

const { data, loading, error } = useFetchState('/api/data');
```

### useIntervalState
A hook for setting up intervals.

```javascript
import useIntervalState from './hooks/useIntervalState';

useIntervalState(() => {
  // Callback function
}, 1000); // 1 second
```

### useTimeoutState
A hook for setting up timeouts.

```javascript
import useTimeoutState from './hooks/useTimeoutState';

useTimeoutState(() => {
  // Callback function
}, 1000); // 1 second
```

### usePreviousDifferentState
A hook for getting the previous different value.

```javascript
import usePreviousDifferentState from './hooks/usePreviousDifferentState';

const previousValue = usePreviousDifferentState(value, (prev, current) => prev === current);
```

### useMergeRefsState
A hook for merging multiple refs.

```javascript
import useMergeRefsState from './hooks/useMergeRefsState';

const mergedRef = useMergeRefsState(ref1, ref2, ref3);
```

### useIsClientState
A hook for checking if the code is running on the client.

```javascript
import useIsClientState from './hooks/useIsClientState';

const isClient = useIsClientState();
```

### useEventListenerState
A hook for adding event listeners.

```javascript
import useEventListenerState from './hooks/useEventListenerState';

useEventListenerState('click', handler, element);
```

### useScriptState
A hook for loading external scripts.

```javascript
import useScriptState from './hooks/useScriptState';

const status = useScriptState('https://example.com/script.js');
```

### useRazorpayState
A hook for loading and using Razorpay.

```javascript
import useRazorpayState from './hooks/useRazorpayState';

const [razorpay, status] = useRazorpayState();
```

## Application Specific Hooks

### usePaymentState
A hook for handling payment operations.

```javascript
import usePaymentState from './hooks/usePaymentState';

const { initiatePayment, loading, error } = usePaymentState();
```

### useCartState
A hook for managing shopping cart state.

```javascript
import useCartState from './hooks/useCartState';

const { cart, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart, isInCart } = useCartState();
```

### useWishlistState
A hook for managing wishlist state.

```javascript
import useWishlistState from './hooks/useWishlistState';

const { wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist } = useWishlistState();
```

### useCompareState
A hook for managing product comparison state.

```javascript
import useCompareState from './hooks/useCompareState';

const { compareList, addToCompare, removeFromCompare, isInCompare, clearCompare } = useCompareState();
```

### useRecentlyViewedState
A hook for managing recently viewed items.

```javascript
import useRecentlyViewedState from './hooks/useRecentlyViewedState';

const { recentlyViewed, addRecentlyViewed, clearRecentlyViewed } = useRecentlyViewedState();
```

### useSearchHistoryState
A hook for managing search history.

```javascript
import useSearchHistoryState from './hooks/useSearchHistoryState';

const { searchHistory, addSearchTerm, removeSearchTerm, clearSearchHistory } = useSearchHistoryState();
```

### useInventorySearchState
A hook for searching inventory items.

```javascript
import useInventorySearchState from './hooks/useInventorySearchState';

const { searchTerm, setSearchTerm, filteredInventory } = useInventorySearchState(inventory);
```

### useOrderSearchState
A hook for searching orders.

```javascript
import useOrderSearchState from './hooks/useOrderSearchState';

const { searchTerm, setSearchTerm, filteredOrders } = useOrderSearchState(orders);
```

### useOrderFilterState
A hook for filtering orders.

```javascript
import useOrderFilterState from './hooks/useOrderFilterState';

const { statusFilter, setStatusFilter, filteredOrders } = useOrderFilterState(orders);
```

### useInventoryFilterState
A hook for filtering inventory.

```javascript
import useInventoryFilterState from './hooks/useInventoryFilterState';

const { categoryFilter, setCategoryFilter, stockFilter, setStockFilter, filteredInventory } = useInventoryFilterState(inventory);
```

### usePaginationState
A hook for paginating data.

```javascript
import usePaginationState from './hooks/usePaginationState';

const { currentPage, totalPages, paginatedData, goToPage, nextPage, prevPage } = usePaginationState(data, 10);
```

### useSortState
A hook for sorting data.

```javascript
import useSortState from './hooks/useSortState';

const { sortedData, sortKey, sortDirection, toggleSort } = useSortState(data, 'name', 'asc');
```

### useFilterState
A hook for filtering data.

```javascript
import useFilterState from './hooks/useFilterState';

const { filteredData, filters, setFilter, clearFilters } = useFilterState(data, filterFunction);
```

### usePizzaBuilderState
A hook for managing pizza builder state.

```javascript
import usePizzaBuilderState from './hooks/usePizzaBuilderState';

const { selectedBase, selectedSauce, selectedCheese, selectedVeggies, selectedMeats, selectBase, selectSauce, selectCheese, toggleVeggie, toggleMeat, calculateTotal, resetBuilder, getPizzaData } = usePizzaBuilderState();
```

### useMenuState
A hook for managing menu state.

```javascript
import useMenuState from './hooks/useMenuState';

const { menu, loading, error } = useMenuState();
```

### useOrdersState
A hook for managing user orders state.

```javascript
import useOrdersState from './hooks/useOrdersState';

const { orders, loading, error } = useOrdersState();
```

### useAdminOrdersState
A hook for managing admin orders state.

```javascript
import useAdminOrdersState from './hooks/useAdminOrdersState';

const { orders, loading, error } = useAdminOrdersState();
```

### useInventoryState
A hook for managing inventory state.

```javascript
import useInventoryState from './hooks/useInventoryState';

const { inventory, groupedInventory, loading, error } = useInventoryState();
```

### useLowStockAlertState
A hook for managing low stock alerts.

```javascript
import useLowStockAlertState from './hooks/useLowStockAlertState';

const { lowStockItems, hasLowStock } = useLowStockAlertState(inventory);
```

### useOrderStatusState
A hook for managing order status updates.

```javascript
import useOrderStatusState from './hooks/useOrderStatusState';

const status = useOrderStatusState(orderId);
```

### useSocketState
A hook for managing socket connections.

```javascript
import useSocketState from './hooks/useSocketState';

const data = useSocketState('eventName', callback);
```

### useNotificationContextState
A hook for managing notifications.

```javascript
import useNotificationContextState from './hooks/useNotificationContextState';

const { showSuccess, showError, showWarning, showInfo } = useNotificationContextState();
```

### useAuthState
A hook for managing authentication state.

```javascript
import useAuthState from './hooks/useAuthState';

const { user, login, logout, loading } = useAuthState();
```

### useApiState
A hook for managing API calls.

```javascript
import useApiState from './hooks/useApiState';

const { data, loading, error, refetch } = useApiState(apiFunction, dependencies);
```

### useFormValidationState
A hook for form validation.

```javascript
import useFormValidationState from './hooks/useFormValidationState';

const { values, errors, handleChange, handleSubmit, setValues } = useFormValidationState(initialState, validationRules);
```