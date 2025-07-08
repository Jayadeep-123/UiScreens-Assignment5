import '../Styles/MainNavBar.css';

const MainNavbar = () => {
  return (
    <div className="mainNavBar mt-2 border border-1 border-dark rounded-3 px-3 py-2 d-flex align-items-center justify-content-between shadow-sm">
      {[
        "Student Profile",
        "Payments",
        "Transport",
        "Academics",
        "Alerts",
        "History",
        "Room Allotment",
        "Issue Forms",
        "Certificates",
      ].map((item, index) => (
        <div
          key={index}
          className={`tab-item ${item === "Payments" ? "active" : ""}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default MainNavbar;
