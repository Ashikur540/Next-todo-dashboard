import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

type DashboardSmallMetricsProps = {
  title: string;
  metricValue: number;
};
export const DashboardSmallMetricsBlock = ({
  title,
  metricValue,
}: DashboardSmallMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          {metricValue}
        </h4>
      </CardContent>
    </Card>
  );
};
