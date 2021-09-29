export default interface PopulationData {
  labels: Array<string>;
  datasets: [
    {
      data: Array<number>;
      label: string;
    },
  ];
}
