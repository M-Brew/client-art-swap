import React from "react";
import "./blobBackground.css";

export default function BlobBackground(props: IBlobBackground) {
  const { children } = props;

  return (
    <div className="main">
      <Blob number={1} />
      <Blob number={2} />
      <Blob number={3} />
      {children}
    </div>
  );
}

const Blob = (props: { number: number; color?: string }) => {
  const { number, color } = props;

  return (
    <div
      className={`blob-${number}`}
      style={color ? { backgroundColor: color } : undefined}
    />
  );
};

interface IBlobBackground {
  children?: React.ReactNode;
}
