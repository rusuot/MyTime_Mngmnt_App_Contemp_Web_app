
// progress bar function
export const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  // test calculations:
  // assume max is 10
  // assume amount of time is 2
  // 2/10= 0.2 => primary
  if (ratio === 1)  {
    return "success";
  }
  else if (ratio > 0.45) {
    return "primary";
  }
  else if (ratio < 0.85) {
    return "warning";
  }
  else {
    return "danger";
  }

};

export const getProgressBarVariantContainer = (amount, max) => {
  // currentAvailable/freeHours
  // current = time amount
  // free = max
  //  126 free from a total of 141

// test calculations:
//  If there are 126 available from 141 free hours => 0.87 => progress bar should be green as it's high percentage
// there for getProgressBarVariantContainer logic is different from getProgressBarVariant

  // const ratio = amount / max;
  const ratio = amount / max;

if (ratio === 1) {
  return "success";
} else if (0.1 > ratio > 0.35) {
  return "primary";
} else if (0.36 > ratio > 0.75) {
  return "warning";
}else {
  return "danger";
}
};


export const getProgressBarVariant2Container = (amount, max) => {
  // currentAvailable/freeHours
  // current = time amount
  // free = max
  //  126 free from a total of 141

// test calculations:
//  If there are 126 available from 141 free hours => 0.87 => progress bar should be green as it's high percentage
// there for getProgressBarVariantContainer logic is different from getProgressBarVariant

  // const ratio = amount / max;
  const ratio = amount / max;

if (ratio === 1) {
  return "success";
} else if (0.1 > ratio > 0.35) {
  return "primary";
} else if (0.36 > ratio > 0.75) {
  return "warning";
}else {
  return "danger";
}
};


// retrieve error message function
export const retrieveErrorMessage = (error) => {
  error = error.substring(error.lastIndexOf("/") + 1, error.length - 2);
  return error;
};