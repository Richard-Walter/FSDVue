import { usePoisStore } from "../store/pois.js";


export function buildShowMyFlights(controlDiv, map){

  // Set CSS for the control border.
  const controlUI = document.createElement("div");

  controlUI.style.backgroundColor = "#18682C";
  controlUI.style.border = "2px solid #18682C";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "10px";
  controlUI.style.marginBottom = "10px";
  controlUI.style.marginLeft = "10px";
  controlUI.style.marginRight = "10px";
  controlUI.style.textAlign = "center";
  // controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");

  controlText.style.color = "white";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "14px";
  controlText.style.lineHeight = "32px";
  controlText.style.paddingLeft = "10px";
  controlText.style.paddingRight = "10px";
  controlText.innerHTML = "Flight Plan";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    alert('show my flights')
  });
}
  export function buildFlightPlanControl(controlDiv, map){

  // Set CSS for the control border.
  const controlUI = document.createElement("div");

  controlUI.style.backgroundColor = "#017BFF";
  controlUI.style.border = "2px solid #017BFF";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "10px";
  controlUI.style.marginBottom = "10px";
  controlUI.style.marginLeft = "10px";
  controlUI.style.marginRight = "10px";
  controlUI.style.textAlign = "center";
  // controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");

  controlText.style.color = "white";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "14px";
  controlText.style.lineHeight = "32px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = "Show my flights";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    alert('toggle flight plan')
  });
}



//SEARCH BAR
export function  buildSearchPOIBBTN(controlDiv, map) {

  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.classList = "";
  //controlUI.attributes = "hidden";
  // controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  // controlUI.style.cursor = "pointer";
  controlUI.style.margin = "10px";
  // controlUI.style.textAlign = "center";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.classList = "input-group input-group-sm poi_search_field autocomplete";
  controlText.id = "searchPOIS";


  let controlInput = document.createElement('INPUT');
  controlInput.id = "poi_search_field_input";
  controlInput.type = "text";
  controlInput.className = "form-control";
  controlInput.setAttribute("placeholder", "Search for a Point of Interest");

  let controlButton = document.createElement("div");
  controlButton.className = "input-group-append";

  let buttonSearchPOIInnerHTML =

    '   <button class="btn btn-primary" type="button" disabled>' +
    '     <i class="fa fa-search"></i>' +
    '   </button>'

  controlButton.innerHTML = buttonSearchPOIInnerHTML;
  controlText.appendChild(controlInput)
  controlText.appendChild(controlButton)
  controlUI.appendChild(controlText)

  let currentAutocompleteItemFocus;

  // autocomplete functionality
  controlInput.addEventListener("input", () => {

    const poisStore = usePoisStore();
    
    const pois = poisStore.pois
    var poiNames =pois.map((poi)=>{
      return poi.name
    });
    var divCreate,
      b,
      i,
      fieldVal = controlInput.value;
    closeAllLists();
    if (!fieldVal) {
      return false;
    }
    currentAutocompleteItemFocus = -1;
    divCreate = document.createElement("DIV");
    divCreate.setAttribute("id", controlInput.id + "autocomplete-list");
    divCreate.setAttribute("class", "autocomplete-items poi-search");
    divCreate.style.cursor = 'pointer';
    controlInput.parentNode.appendChild(divCreate);
    b = document.createElement("DIV");


    for (i = 0; i < poiNames.length; i++) {


      if (poiNames[i].toUpperCase().includes(fieldVal.toUpperCase())) {

        b = document.createElement("DIV");
        b.setAttribute("tabindex", "-1")
        // b.innerHTML = "<strong>" + poiNames[i].substr(0, fieldVal.length) + "</strong>";
        let match_index = poiNames[i].toUpperCase().search(fieldVal.toUpperCase());
        b.innerHTML += poiNames[i].substring(0, match_index);
        let strong_text = poiNames[i].substring(match_index, match_index + fieldVal.length)
        b.innerHTML += "<strong>" + strong_text + "</strong>";
        b.innerHTML += poiNames[i].substr(match_index + fieldVal.length, poiNames[i].length);
        // b.innerHTML += "<input disabled type='hidden' value='" + poiNames[i] + "'>";
        b.innerHTML += `<input disabled type='hidden' value="` + poiNames[i] + `">`;

        //
        b.addEventListener("click", function (e) {

          controlInput.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();

          //detemine lat/lng of selected poi
          let selectedPOIList = pois.filter((poi)=>{
            //nconsole.log(poi.name ,controlInput.value );
            return poi.name == controlInput.value
          })

          //let selectedPOI = infowindow_dict[controlInput.value];
          const selectedPOI = selectedPOIList[0]
          console.log(selectedPOI);
          let poiLat = parseFloat(selectedPOI['latitude']);
          let poiLng = parseFloat(selectedPOI['longitude']);

          //set map coords and zoom in on poi
          map.setCenter({ lat: poiLat, lng: poiLng });
          map.setZoom(10);
          location.hash = "#" + 'where_togo_area';

          //clear input
          this.blur();
          controlInput.value = '';
        });
        divCreate.appendChild(b);
      }
    }

  });

  controlInput.addEventListener("keydown", function (e) {
    var autocompleteList = document.getElementById(
      controlInput.id + "autocomplete-list"
    );
    if (autocompleteList)
      autocompleteList = autocompleteList.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentAutocompleteItemFocus++;
      addActive(autocompleteList);
    } else if (e.keyCode == 38) {
      //up
      currentAutocompleteItemFocus--;
      addActive(autocompleteList);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentAutocompleteItemFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (autocompleteList) {
          autocompleteList[currentAutocompleteItemFocus].click();
        }
      }
    }
  });


  function addActive(autocompleteList) {
    if (!autocompleteList) return false;
    removeActive(autocompleteList);
    if (currentAutocompleteItemFocus >= autocompleteList.length) currentAutocompleteItemFocus = 0;
    if (currentAutocompleteItemFocus < 0) currentAutocompleteItemFocus = autocompleteList.length - 1;
    autocompleteList[currentAutocompleteItemFocus].classList.add("autocomplete-active");
  }

  function removeActive(autocompleteList) {
    for (var i = 0; i < autocompleteList.length; i++) {
      autocompleteList[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var autocompleteList = document.getElementsByClassName(
      "autocomplete-items"
    );
    for (var i = 0; i < autocompleteList.length; i++) {
      if (elmnt != controlInput) {
        autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });

}

