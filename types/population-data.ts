export default interface PopulationData {
  labels: Array<string>;
  datasets: Array<{
    data: Array<number>;
    label: string;
    backgroundColor: Array<string>;
    borderColor: Array<string>;
  }>;
}
