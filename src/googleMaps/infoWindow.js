
//console.log(otherhtml);
import { usePoisStore } from "../store/pois.js";



export function buildPoiInfoWindowContent(poi, hiddenDetails) {

  const poisStore = usePoisStore();

  console.log(poisStore.isLoading);
  console.log(poisStore.poiIWHTML);
  return poisStore.poiIWHTML;
}