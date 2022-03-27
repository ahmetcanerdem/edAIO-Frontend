import React, { useMemo } from 'react';

const CustomTooltip = (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    []
  );
  return (
    <div
      className="custom-tooltip"
      style={{ backgroundColor: props.color || "white" }}
    >
      <p>
        <span>{data}</span>
      </p>
    </div>
  );
};

export default CustomTooltip;
