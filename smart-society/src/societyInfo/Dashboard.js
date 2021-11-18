import Announcement from "./Announcement";
import Contents from "../navigation/Contents";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Dashboard() {
  const [announcement, setAnnouncement] = useState([]);
  const [funds, setFunds] = useState(0);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/society_info/announcements/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setAnnouncement(array.results);
        } else {
          navigate("/logout");
        }
      };
      fetchData();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = `${process.env.REACT_APP_BACKEND_HOST}/api/society_info/announcements/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setAnnouncement(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchData();
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/payments/funds/`;
    const fetchFunds = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setFunds(result.funds);
      } else {
        navigate("/logout");
      }
    };
    fetchFunds();
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div
            className="
              pb-10
              pt-4
              px-5
              sm:px-10
              md:px-10
              lg:px-10
              "
          >
            <div className="flex">
              <div className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                Funds: {funds}
              </div>
              <div className="flex-grow px-3 text-center dark:text-white uppercase tracking-wider font-semibold  text-xl md:text-3xl">
                Announcements
              </div>
              <Link to="/announcements/add">
                <button className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  + Add
                </button>
              </Link>
            </div>
            <form
              className="border rounded flex mt-5"
              onSubmit={formik.handleSubmit}
            >
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="Search..."
                name="search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
              />
              <button type="submit" className="px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            {announcement &&
              announcement.map((element) => {
                return (
                  <Announcement
                    key={element.s_no}
                    category={element.category}
                    description={element.description}
                    date={new Date(element.date).toLocaleString("en-in")}
                    author={element.author}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
