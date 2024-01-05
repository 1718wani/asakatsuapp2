export const colorsForCountOnHeatMap = (count: number | undefined): string => {
  switch (count) {
    case 1:
      return "bg-red-100";
    case 2:
      return "bg-red-200";
    case 3:
      return "bg-red-300";
    case 4:
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};
