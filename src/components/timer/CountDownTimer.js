import React from "react";
import { Grid } from "@mui/material";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";

const ShowCounter = ({ days, hours, minutes, seconds, startDate }) => {
  let today = new Date().getTime();

  return (
    <div>
      <Grid
        lg={12}
        xs={12}
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        {today <= startDate ? (<>
          <font size="2">Not started!</font>
        </>) : (<>
          {days + hours + minutes + seconds < 0 ? (
            <font size="2">ENDED!</font>
          ) : days + hours + minutes + seconds === 0 ? (
            <font size="2">Not started!</font>
          ) : (
            <Grid
              lg={12}
              direction="row"
              container
              justifyContent="space-between"
              // alignItems="center"
            >
              <font size="2">
                <DateTimeDisplay
                  value={days}
                  type={"d"}
                  isDanger={days <= 3}
                ></DateTimeDisplay>
              </font>
              <font size="2">:</font>
              <font size="2">
                <DateTimeDisplay value={hours} type={"h"} isDanger={false} />
              </font>
              <font size="2">:</font>
              <font size="2">
                <DateTimeDisplay
                  style={{ fontSize: "10px" }}
                  value={minutes}
                  type={"m"}
                  isDanger={false}
                />
              </font>
              <font size="2">:</font>
              <font size="2">
                <DateTimeDisplay value={seconds} type={"s"} isDanger={false} />
              </font>
            </Grid>
          )}
        </>)}
      </Grid>
    </div>
  );
};


const CountdownTimer = ({ targetDate, startDate }) => {
  let Timer = new Date(targetDate).getTime();
  let Timer1 = new Date(startDate).getTime();
  const [days, hours, minutes, seconds] = useCountdown(Number(Timer));
  // console.log("dYS",Number.isNaN(days))
  return (
    <ShowCounter
      days={Number.isNaN(days) ? "0" : days}
      hours={Number.isNaN(days) ? "0" : hours}
      minutes={Number.isNaN(days) ? "0" : minutes}
      seconds={Number.isNaN(days) ? "0" : seconds}
      startDate={Timer1}
    />
  );
};

export default CountdownTimer;