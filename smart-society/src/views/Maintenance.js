import React, { useState, useEffect } from "react";
import MaintenanceMobileTable from "../components/MaintenanceMobileTable";
import TableCell from "../components/TableCell";
import TableHeader from "../components/TableHeader";
import { Link } from "react-router-dom";
import Contents from "../components/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `http://127.0.0.1:8000/api/payments/maintenance/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setMaintenance(array.results);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
      };
      fetchData();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/api/payments/maintenance/";
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setMaintenance(array.results);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="flex-col hidden sm:flex">
            <div className="overflow-x-auto py-5">
              <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
                Maintenance
              </div>
              <form
                className="border rounded flex my-3 mx-5"
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
              <div
                className="
                  py-3
                  align-middle
                  inline-block
                  min-w-full
                  px-5
                  md:py-5
                "
              >
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white ">
                      <tr>
                        <TableHeader title="Property" />
                        <TableHeader title="Month" />
                        <TableHeader title="Basic" />
                        <TableHeader title="Paid" />
                        <TableHeader title="Penalty" />
                        <TableHeader title="Due" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {maintenance &&
                        maintenance.map((element) => {
                          return (
                            <tr
                              key={element.property_no + element.month}
                              className="divide-x-2 divide-gray-200 even:bg-gray-100"
                            >
                              <TableCell value={element.property_no} />
                              <TableCell
                                value={new Date(element.month).toLocaleString(
                                  "en-in",
                                  { year: "numeric", month: "long" }
                                )}
                              />
                              <TableCell
                                value={element.amount_basic.toString()}
                              />
                              <TableCell
                                value={element.amount_paid.toString()}
                              />
                              <TableCell
                                value={element.amount_penalty.toString()}
                              />
                              <TableCell
                                value={element.amount_due.toString()}
                              />
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/pay"
                    className="
                      m-2
                      py-2
                      px-2
                      font-medium
                      text-white
                      dark:text-gray-900
                      bg-green-500
                      rounded
                      hover:bg-green-400
                      transition
                      duration-300
                    "
                  >
                    Add Payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col flex sm:hidden">
            <div className="overflow-x-auto py-5">
              <div className="text-center uppercase font-semibold text-xl dark:text-white">
                Maintenance
              </div>
              <form
                className="border rounded flex my-3 mx-5"
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
              {maintenance &&
                maintenance.map((element) => {
                  return (
                    <div key={element.property_no + element.month}>
                      <MaintenanceMobileTable
                        property={element.property_no}
                        month={new Date(element.month).toLocaleString("en-in", {
                          year: "numeric",
                          month: "long",
                        })}
                        basic={element.amount_basic.toString()}
                        paid={element.amount_paid.toString()}
                        penalty={element.amount_penalty.toString()}
                        due={element.amount_due.toString()}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
