import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthT from "../../hooks/tauth";
import { useParams } from "react-router-dom";
import api from "../../services/apiServices";
import Sidebar from "../../components/input/sidebar";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState("");

  const fetchData = async (id) => {
    try {
      const res = await api.getSingleStud(id);
      const data = res.data.studentid[0];
      setStudent(data);
    } catch (error) {
      console.error("Error fetching individual:", error);
    }
  };

  useEffect(() => {
    fetchData(id); // eslint-disable-next-line
  }, [id]);
  return (
    <AuthT>
      <div className="dashboard__container">
        <div className="dashboard__content">
          <Sidebar />
          <div className="dashboard">
            <div className="flex bg-gray-100 pb-3">
              <Toaster />
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
                  <div>
                    <h1
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Poppins', san-serif" }}
                    >
                      Student Profile
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      View and manage student information
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0"></div>
                </div>

                <div className="p-6">
                  <div className="p-6 bg-white shadow-lg rounded-lg">
                    {student ? (
                      <>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-12">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="flex-shrink-0">
                              <div className="w-24 h-24 rounded-full border-4 border-blue-100 bg-gray-100"></div>
                            </div>
                            <div className="px-4 py-12">
                              <h1 className="text-xl font-bold">
                                {student.name}
                              </h1>
                              <p className="text-sm">Class: {student.class}</p>
                            </div>
                          </div>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
                            Export
                          </button>
                        </div>
                        <hr className="border-gray-300 mb-6 md:mt-4" />
                        <section className="px-12 pb-8">
                          <h5 className="text-md font-semibold">
                            Student Information
                          </h5>
                          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-10 mt-4">
                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Admission Date:
                                </h6>
                                <p className="text-md">{student.admission}</p>
                              </div>

                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Date Of Birth:
                                </h6>
                                <p>{student.dob}</p>
                              </div>

                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Gender:
                                </h6>
                                <p>{student.gender}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-10 mt-5">
                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Address:
                                </h6>
                                <p>{student.address}</p>
                              </div>

                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Contact:
                                </h6>
                                <p>{student.contact}</p>
                              </div>

                              <div className="flex flex-col items-start">
                                <h6 className="text-gray-600 text-sm font-semibold">
                                  Email:
                                </h6>
                                <p>{student.email}</p>
                              </div>
                            </div>
                          </div>
                        </section>
                      </>
                    ) : (
                      <p>No teacher data found.</p>
                    )}
                    
                  </div>


                  {/* Performance */}

                  {/* <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                      <Tabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                      />
                      {selectedTab === "Performances" && <Perfomances />}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default StudentDetail;
