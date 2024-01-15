// progress bar function
export const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  // test calculations:
  // assume max is 10
  // assume amount of time is 2
  // 2/10= 0.2 => primary
  if (ratio === 1) return "success";
  if (ratio > 0.45) return "primary";
  if (ratio < 0.85) return "warning";
  else return "danger";

};

export const getProgressBarVariantContainer = (amount, max) => {
  const ratio = amount / max;
  // test calculations:
  // assume max is 10
  // assume amount of time is 1
  // 1/10= 0.1 => primary -> success as many hours were burned which is the intention
  if (ratio === 1 ) return "success";
  if (ratio < 0.45) return "primary";
  if (ratio < 0.85) return "warning";
  else return "danger";

};

// retrieve error message function
export const retrieveErrorMessage = (error) => {
  error = error.substring(error.lastIndexOf("/") + 1, error.length - 2);
  return error;
};