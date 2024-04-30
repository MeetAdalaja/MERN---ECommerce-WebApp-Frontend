import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);

    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    // const monthDate = currentDate.clone().subtract(i, "months");
    // const monthName = monthDate.format("MMMM");

    // last6Months.unshift(monthName);



    // temporary code to shows in internship review, above is real code
    const dayDate = currentDate
      .clone()
      .subtract(i + 2 - new Date().getDate(), "days");
    const dayName = dayDate.format("MMMM DD");
    last6Months.unshift(dayName);
  }

  for (let i = 0; i < 12; i++) {
    // const monthDate = currentDate.clone().subtract(i, "months");
    // const monthName = monthDate.format("MMMM");
    // last12Months.unshift(monthName);



    
    // temporary code to shows in internship review, above is real code
    const dayDate = currentDate
      .clone()
      .subtract(i + 2 - new Date().getDate(), "days");
    const dayName = dayDate.format("MMMM DD");
    last12Months.unshift(dayName);
  }

  return {
    last6Months,
    last12Months,
  };
};
