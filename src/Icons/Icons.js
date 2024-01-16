// Ref for Icons used from material-symbols-outlined:
// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:info:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=info
//  https://fonts.google.com/icons?icon.query=menu
// react import
import React from "react";

// menu icon displayed in navbar
export const MenuIcon = ({ className }) => {
  return <span className={"material-symbols-outlined " + className}>menu</span>;
};

export const Troubleshoot = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>troubleshoot</span>
  );
};

export const CalendarClock = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>calendar_clock</span>
  );
};

export const TableChartViewIcon = ({ className }) => {
  return (
    <span className={"material-symbols-outlined " + className}>
      table_chart_view
    </span>
  );
};

export const InfoIcon = ({ className }) => {
  return (
<span class="material-symbols-outlined">
info
</span>
  );
};


export const DeleteIcon = ({ className }) => {
  return (
<span class="material-symbols-outlined">
delete
</span>
  );
};




