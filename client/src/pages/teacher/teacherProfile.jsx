import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiServices";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/input/sidebar.jsx";
import Navbar from "../../components/input/top.jsx";
import FormButton from "../../components/input/formButton";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [teacherClass, setTeacherClasses] = useState(null);
  const [teacherSubject, setTeacherSubjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getSingleTeacher(id);
        const data = res.data.teacherid;

        setTeacher(data);
      } catch (error) {
        console.error("Error fetching individual:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCData = async () => {
      try {
        const res = await api.getTeacherClasses(id);
        const data = res.data.classes;
        if (!data) {
          setTeacherClasses(data);
        } else {
          setTeacherClasses(data);
        }
      } catch (error) {
        console.error("Error fetching individual:", error);
      }
    };

    fetchCData();
  }, [id]);

  useEffect(() => {
    const fetchSData = async () => {
      try {
        const res = await api.getTeacherSubjects(id);
        const data = res.data.subs;
        if (!data) {
          setTeacherClasses(data);
        } else {
          setTeacherSubjects(data);
        }
      } catch (error) {
        console.error("Error fetching individual:", error);
      }
    };

    fetchSData();
  }, [id]);

  const handleRedirect = () => {
    navigate("/config");
  };

  console.log(teacherSubject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <div className="dashboard__content">
        <Sidebar />
        <div className="dashboard">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="px-8 py-6 pl-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      Teacher Profile
                    </h1>
                    <p className="text-gray-600 font-medium">
                      View and manage teacher information
                    </p>
                  </div>
                </div>
                <Navbar />
              </div>
            </div>
          </header>
          <main className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-start mb-8">
                <FormButton
                  label={"Back"}
                  id={"tyepButton"}
                  onClick={handleRedirect}
                />
              </div>
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                <div className="relative p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          {teacher ? (
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                              <p className="text-gray-600 font-medium mb-1">{teacher.email}</p>
                              <p className="text-gray-600 font-medium">{teacher.contact}</p>
                            </div>
                          ) : (
                            <p className="text-gray-600">No user data found.</p>
                          )}
                        </div>
                        <FormButton
                          label={"Deactivate"}
                          id={"dangerButton"}
                          onClick={handleRedirect}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">Classes</h4>
                        </div>
                        <ul className="space-y-2">
                          {teacherClass ? (
                            <li className="text-gray-600 font-medium">{teacherClass.name}</li>
                          ) : (
                            <li className="text-gray-500">No classes assigned yet</li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">Subjects</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="text-gray-600 font-medium">English</li>
                          <li className="text-gray-600 font-medium">Mathematics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;

