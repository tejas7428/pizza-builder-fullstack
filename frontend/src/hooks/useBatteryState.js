import { useState, useEffect } from 'react';

const useBatteryState = () => {
  const [battery, setBattery] = useState({
    supported: false,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null
  });

  useEffect(() => {
    if (!navigator.getBattery) {
      setBattery(prev => ({
        ...prev,
        supported: false,
        loading: false
      }));
      return;
    }

    let batteryApi;

    const handleBattery = (batteryManager) => {
      batteryApi = batteryManager;

      const updateBattery = () => {
        setBattery({
          supported: true,
          loading: false,
          level: batteryManager.level,
          charging: batteryManager.charging,
          chargingTime: batteryManager.chargingTime,
          dischargingTime: batteryManager.dischargingTime
        });
      };

      updateBattery();

      batteryManager.addEventListener('chargingchange', updateBattery);
      batteryManager.addEventListener('chargingtimechange', updateBattery);
      batteryManager.addEventListener('dischargingtimechange', updateBattery);
      batteryManager.addEventListener('levelchange', updateBattery);
    };

    navigator.getBattery().then(handleBattery);

    return () => {
      if (batteryApi) {
        batteryApi.removeEventListener('chargingchange', handleBattery);
        batteryApi.removeEventListener('chargingtimechange', handleBattery);
        batteryApi.removeEventListener('dischargingtimechange', handleBattery);
        batteryApi.removeEventListener('levelchange', handleBattery);
      }
    };
  }, []);

  return battery;
};

export default useBatteryState;