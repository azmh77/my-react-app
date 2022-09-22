import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Navbar.css";

import { FcSettings, FcRefresh } from "react-icons/fc";
import { timeDate_Action } from "./../../redux/actions/timeDate_Action/timeDate_Action";

export default function Navbar() {
  let date = "";
  const dispatch = useDispatch();
  const dateTime = useSelector((state) => state.date);
  const { loading, time_Date } = dateTime;

  useEffect(() => {
    dispatch(timeDate_Action);
  }, [dispatch]);

  if (loading === false) {
    date = time_Date.date;
  }

  return (
    <div className="Navbar">
      <div className="UserInfo">
        <div>نام کاربری : محمد میرزایی</div>
        {loading === false ? (
          <div className="d-flex">
            <div className="Date mx-2 mt-2">
              تاریخ امروز : {date.year.number.fa}/{date.month.number.fa}/
              {date.day.number.fa}
            </div>
          </div>
        ) : (
          "LAODING ..."
        )}
      </div>
      <div className="Settings">
        <div>
          <i>
            <FcSettings />
          </i>
          <span>تنظیمات</span>
        </div>
        <div>
          <i>
            <FcRefresh />
          </i>
          <span>خروج</span>
        </div>
      </div>
    </div>
  );
}
