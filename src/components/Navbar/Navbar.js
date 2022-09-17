import "./Navbar.css";
import { FcSettings, FcRefresh } from "react-icons/fc";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="UserInfo">
        <div>نام کاربری : محمد میرزایی</div>
        <div className="Date">تاریخ امروز : 1401/07/23</div>
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
