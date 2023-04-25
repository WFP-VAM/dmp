export const BriefDroughtReport = ({
  report,
}: {
  report: Record<string, string | number | undefined>[];
}) => {
  return <div>{JSON.stringify(report)}</div>;
};
