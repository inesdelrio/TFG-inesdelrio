const EVENT_COLORS = [
  {
    colorClass: "calendar-event-pastel-0",
    markerColor: "#f8dfcf",
    markerTextColor: "#8a4630",
  },
  {
    colorClass: "calendar-event-pastel-1",
    markerColor: "#f7d6d6",
    markerTextColor: "#8a3636",
  },
  {
    colorClass: "calendar-event-pastel-2",
    markerColor: "#dcefdc",
    markerTextColor: "#356f43",
  },
  {
    colorClass: "calendar-event-pastel-3",
    markerColor: "#dcebf8",
    markerTextColor: "#315f86",
  },
  {
    colorClass: "calendar-event-pastel-4",
    markerColor: "#f8edc6",
    markerTextColor: "#7a6422",
  },
  {
    colorClass: "calendar-event-pastel-5",
    markerColor: "#eadcf8",
    markerTextColor: "#65427d",
  },
];

function getEventColorData(eventId) {
  const numericId = Number(eventId);
  const index = Number.isFinite(numericId) ? Math.abs(numericId) % EVENT_COLORS.length : 0;

  return EVENT_COLORS[index];
}

module.exports = {
  EVENT_COLORS,
  getEventColorData,
};
