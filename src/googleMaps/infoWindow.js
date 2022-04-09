export function getIWIconsHTML(
  latitude,
  longitude,
  marker_name,
  country,
  cateogry,
  nearest_icao
) {
  let skyvectorHTML = "";
  let wikiHTML = "";

  if (cateogry.includes("Airport") && nearest_icao) {
    skyvectorHTML =
      '<a href="https://skyvector.com/airport/' +
      nearest_icao +
      '" target="_blank" class="fa fai fai-plane fa-plane" title="Skyvector"></a>';
  }

  if (cateogry.includes("Airport")) {
    wikiHTML = "";
  } else {
    wikiHTML =
      '<a href="https://en.wikipedia.org/wiki/' +
      marker_name +
      '" target="_blank" class="fa fai  fa-wikipedia-w" title="Wikipedia"></a>';
  }

  let iwIconsHTML =
    '<div class="my-1 border border-seconday ">' +
    '<a href="https://www.google.com/search?q=' +
    marker_name +
    ", " +
    country +
    '" target="_blank" class="fa fai  fa-google" title="Google"></a>' +
    wikiHTML +
    '<a href="https://www.youtube.com/results?search_query=' +
    marker_name +
    ", " +
    country +
    '" target="_blank" class="fa fai fa-youtube" title="Youtube"></a>' +
    skyvectorHTML +
      '<i id="copyCoordsIcon" class="fa fai fai-map-marker fa-map-marker fa-lg" title="Copy coordinates" onclick="copyLatLon()" style="color:#9E1010; cursor:pointer"></i>'+
      '<p id="coordsCopiedTXT" class="my-0" style="font-size: 0.8em; display:none" >Coorindates copied: ' + latitude + ', ' + longitude + '</p>' +
      '<input type="hidden" id="poiLatLong" name="poiLatLong" value="' + latitude + ', ' + longitude + '">' +
    "</div>";

  return iwIconsHTML;
}

export function getVisitedCheckIcon(poiID, userVisitedPois) {
  for (let i = 0; i < userVisitedPois.length; i++) {
    if (userVisitedPois[i].poi_id == poiID) {
      return "fa-check-square-o";
    }
  }
  return "fa-square-o";
}

export function getFavCheckIcon(poiID, userFavPois) {
  for (let i = 0; i < userFavPois.length; i++) {
    if (userFavPois[i].poi_id == poiID) {
      return "fa-heart";
    }
  }
  return "fa-heart-o";
}
