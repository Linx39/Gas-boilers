const MAP_LAYER = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
const MAP_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
const SCALE = 16;
const CenterCoordinates = {
  LAT: 59.092413,
  LNG: 37.906381,
};
const AddressCoordinates = {
  LAT: 59.092002,
  LNG: 37.898844,
};

const mapIcon = L.icon({
  iconUrl: '../img/icons/bullet.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map(`map`, {zoomControl: false});

const addressMarker = L.marker(
  {
    lat: AddressCoordinates.LAT,
    lng: AddressCoordinates.LNG,
  },
  {
    draggable: false,
    icon: mapIcon,
  },
);

export const setMapViewCenter = () => {
  map.setView({
    lat: CenterCoordinates.LAT,
    lng: CenterCoordinates.LNG,
  }, SCALE);
};

export const loadMap = () => {
  setMapViewCenter();

  L.tileLayer(
    MAP_LAYER,
    {
      attribution: MAP_ATTRIBUTION,
    },
  ).addTo(map);

  addressMarker.addTo(map);
}
