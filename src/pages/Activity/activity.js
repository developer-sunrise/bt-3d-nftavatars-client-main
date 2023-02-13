import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { RiSearchFill } from "react-icons/ri";
import Fade from "react-reveal/Fade";
import ActivityTables from "../../components/table/ActivityTable/TotalActivityTable";
import RankingTable from "../../components/table/ActivityTable/RankingTable";
import Select from "react-select";
import { Ranking } from "../../helpers/datafile";
import { getMethod } from "../../apis/index";

function Activity() {

  const ActivitySelect = [
    { value: "All", label: "All" },
    { value: "1Day", label: "1Day" },
    { value: "2Days", label: "2Days" },
    { value: "7Days", label: "7Days" },
  ];

  const [clickChange, setClickchange] = useState("");
  const [ActiveTableData, setActiveTableData] = useState([]);
  const [ActiveTableData1, setActiveTableData1] = useState([]);
  const [RankingTableData, setRankingTableData] = useState([]);

  const allcollection = async (check) => {
    if (check === "Activity") {
      setClickchange("Activity");
    }
    else if (check === "ranking") {
      setClickchange("ranking");
    }

  };

  const getActivity = async () => {
    try {
      let url = "viewActivities";
      let response = await getMethod({ url });
      if (response.status) {
        setActiveTableData(response.result);
        setActiveTableData1(response.result);
      }
    }
    catch (e) {
      console.log("error in addusers", e);
    }
  };

  useEffect(() => {
    getActivity();
    setClickchange("Activity");
    // handleChange("not");
    setRankingTableData(Ranking);
  }, []);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(22 22 45)",
      color: "white",
      border: "0px",
      outline: "0px",
      boxShadow: "0px",
      borderRadius: "10px",
      padding: "4%",
    }),
    menuList: (styles) => ({
      ...styles,
      background: "rgb(22 22 45)",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        background: isFocused ? "#0BC209" : "rgb(22 22 45)",
        color: "white"
      };
    },
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "white",
      }
    }
  };

  const handlesearch = (e) => {
    let data = ActiveTableData1.filter((res) => {
      return ((res.nftName).toLowerCase()).match((e).toLowerCase()) || ((res.collectionName).toLowerCase()).match((e).toLowerCase()) || ((res.collectionName.split(" ")[0]+res.collectionName.split(" ")[1]).toLowerCase()).match((e).toLowerCase()) || ((res.ownerName).toLowerCase()).match((e).toLowerCase()) || ((res.createdOn.split(" ")[2] + "-" + res.createdOn.split(" ")[1] + "-" + res.createdOn.split(" ")[3]).toLowerCase()).match((e).toLowerCase()) || ((res.createdOn.split(" ")[4]).toLowerCase()).match((e).toLowerCase()) || ((res.activityType).toLowerCase()).match((e).toLowerCase());
    });
    console.log("e", e,data);
    setActiveTableData(data);
  };

  const handleSelectChange = (e) => {
    console.log("e", e, ActiveTableData1);
    if (e === "All") {
      setActiveTableData(ActiveTableData1);
    }
    else if (e === "1Day") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24))))+"Day" === "0Day" && "1Day");
      setActiveTableData(data);
    }
    else if (e === "2Days") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24))))+"Days" === "2Days");
      setActiveTableData(data);
    }
    else if (e === "7Days") {
      let data = ActiveTableData1.filter((val) => (Math.abs(parseInt((new Date(val?.createdOn).getTime() - new Date().getTime()) / (1000 * 3600 * 24))))+"Days" === "7Days");
      setActiveTableData(data);
    }
  };

  const handleSearch1 = (e) => {
    let data1 = Ranking.filter((res) => {
      return ((res.position).match(e)) || ((res.baseprice).match(e));
    });
    setRankingTableData(data1);
  };

  return (
    <div>
      <Fade bottom>
        <Grid lg={12} xs={12} container justifyContent="" alignItems="center">
          <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
            <p className={clickChange === "Activity" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => allcollection("Activity")}>Activity</p>
          </Grid>
          <Grid lg={2.3} xs={6} container justifyContent="center" alignItems="center">
            <p className={clickChange === "ranking" ? "click pointer" : "collection-text mx-1 text-muted pointer"} role="presentation" onClick={() => allcollection("ranking")}>Ranking</p>
          </Grid>
        </Grid>
      </Fade>
      <Grid lg={12} xs={12} container justifyContent="space-between" alignItems="center" sx={{ padding: "1% 7%" }}>
        <Grid lg={3.5} xs={12} className="nav-input spaceinmobileviewforprofilepage1" container direction="row" justifyContent="center">
          {clickChange === "Activity" ? (<>
            <input placeholder="Search" onChange={(e) => handlesearch(e.target.value)} />
          </>) : (<>
            <input placeholder="Search" onChange={(e) => handleSearch1(e.target.value)} />
          </>)}
          <span style={{ width: "10%" }}><RiSearchFill className="text-muted" size={25} /></span>
        </Grid>
        <Grid lg={2} xs={12} container className="">
          {clickChange === "Activity" ? (<>
            <Select
              styles={customStyles}
              className="w-100"
              options={ActivitySelect}
              placeholder="All"
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(e) => handleSelectChange(e.value)}
            />
          </>) : (<>
            <Select
              styles={customStyles}
              className="w-100"
              placeholder="All"
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </>)}
        </Grid>
        {clickChange === "Activity" ? (<>
          <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
            <ActivityTables ActiveTabledata={ActiveTableData} />
          </Grid>
        </>) : (<>
          <Grid lg={12} xs={12} sx={{ overflow: "auto" }}>
            <RankingTable RankingData={RankingTableData} />
          </Grid>
        </>)}
      </Grid>
    </div>
  );
}
export default Activity;