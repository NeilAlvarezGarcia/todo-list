export function getDataSets(
  data: (string | number)[],
  label?: string,
  bgColorOptions = ['#55EAFF']
) {
  return {
    label,
    data,
    backgroundColor: bgColorOptions,
    borderColor: 'black',
    borderWidth: 2,
  };
}
