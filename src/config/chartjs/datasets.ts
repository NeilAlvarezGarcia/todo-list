export function getDataSets(data: (string | number)[], label?: string) {
  return {
    label,
    data,
    backgroundColor: ['#FF6859', '#F2F53A', '#75F02E', '#D123F3', '#55EAFF', ' #FF55BC'],
    borderColor: 'black',
    borderWidth: 2,
  };
}
