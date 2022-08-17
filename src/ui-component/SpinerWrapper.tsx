import React from "react";
import { TailSpin } from "react-loader-spinner";

const FallbackContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

function SpinerInnerContainer(): JSX.Element {
  return (
    <div style={FallbackContainerStyle}>
      <TailSpin color="#18d0dd" height={80} width={80} />
    </div>
  );
}
export const Loading = SpinerInnerContainer;

export function SpinerWrapper(props: {
  isLoading: boolean;
  children: JSX.Element | JSX.Element[] | string | string[] | undefined;
}): JSX.Element {
  const { isLoading, children } = props;

  return <>{isLoading ? <SpinerInnerContainer /> : children}</>;
}
