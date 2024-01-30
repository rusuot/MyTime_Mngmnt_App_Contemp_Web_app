// Ref for Icons used from material-symbols-outlined:
// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:info:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=info
//  https://fonts.google.com/icons?icon.query=menu
// react import
import React from "react";


// calendar clock icon
export const CalendarClock = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>calendar_clock</span>
  );
};

// icon for table chart
export const TableChartViewIcon = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>
      table_chart_view
    </span>
  );
};

// mini icon for info
export const InfoIcon = ({ className }) => {
  return (
<span class="material-symbols-outlined">
info
</span>
  );
};

// icon for delete-recycle bin
export const DeleteIcon = ({ className }) => {
  return (
<span class="material-symbols-outlined">
delete
</span>
  );
};

// menu icon displayed in navbar
export const MenuIcon = ({ className }) => {
  return <span className={"material-symbols-outlined " + className}>menu</span>;
};

// icon for troubleshoot
export const Troubleshoot = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>troubleshoot</span>
  );
};






