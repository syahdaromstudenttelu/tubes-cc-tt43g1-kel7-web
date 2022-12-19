type ToOrFrom = 'to' | 'from';

export default function CityOptions({ fromOrTo }: { fromOrTo: ToOrFrom }) {
  const cityOpts = (fromOrTo: ToOrFrom) =>
    [
      {
        optValue: '',
        optText: `Pilih kota ${fromOrTo === 'from' ? 'asal' : 'tujuan'}`,
      },
      {
        optValue: 'bandung',
      },
      {
        optValue: 'bogor',
      },
      {
        optValue: 'jakarta',
      },
      {
        optValue: 'cimahi',
      },
      {
        optValue: 'bekasi',
      },
      {
        optValue: 'garut',
      },
    ].map(({ optValue, optText }) => (
      <option key={optValue} value={optValue} disabled={optValue === ''}>
        {optValue === ''
          ? optText
          : optValue.slice(0, 1).toUpperCase() +
            optValue.slice(1, optValue.length)}
      </option>
    ));

  return <>{cityOpts(fromOrTo)}</>;
}
