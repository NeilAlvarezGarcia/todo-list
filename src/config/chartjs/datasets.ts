type Params = {
  data: (string | number)[];
  label?: string;
  bgColorOptions?: string[];
};

export function getDataSets({ data, label, bgColorOptions = ['#55EAFF'] }: Params) {
  return {
    label,
    data,
    backgroundColor: bgColorOptions,
    borderColor: 'black',
    borderWidth: 2,
  };
}
