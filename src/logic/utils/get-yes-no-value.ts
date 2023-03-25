const yesValues = ['1', 'yes', 'on', 'true'];

export const getYesNoValue = (
  value: number | string | undefined | null,
  yesLabel = 'yes',
  noLabel = 'no'
) => {
  if (yesValues.includes(value?.toString().toLowerCase() as any)) return yesLabel;

  return noLabel;
};
