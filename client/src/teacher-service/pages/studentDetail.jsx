import { useEffect, useState } from "react";
import AuthT from "../../hooks/tauth";
import { Link, useParams } from "react-router-dom";
import api from "../../services/apiServices";
import { ChevronLeft, User, Calendar, MapPin, Phone, Mail, GraduationCap, Download, UserCheck } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Link 
                to={'/tstudents'} 
                className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300/50 font-medium text-sm"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Student Profile
                  </h1>
                  <p className="text-gray-600 text-sm">
                    View and manage student information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {student ? (
            <>
              {/* Student Profile Header */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                <div className="relative p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-xl flex items-center justify-center">
                          <User className="w-16 h-16 text-blue-600" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-4 border-white flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                        <div className="flex items-center gap-2 text-gray-600">
                          <GraduationCap className="w-5 h-5" />
                          <span className="text-lg font-medium">Class: {student.class}</span>
                        </div>
                      </div>
                    </div>
                    <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-green-300/50 font-medium text-sm">
                      <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      Export Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
                      <p className="text-gray-600 text-sm">Personal and academic details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Admission Date */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Admission Date</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.admission}</p>
                    </div>

                    {/* Date of Birth */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.dob}</p>
                    </div>

                    {/* Gender */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Gender</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.gender}</p>
                    </div>

                    {/* Address */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Address</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.address}</p>
                    </div>

                    {/* Contact */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Contact</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.contact}</p>
                    </div>

                    {/* Email */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Email</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{student.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/30"></div>
              <div className="relative p-8 text-center">
                <div className="p-4 bg-gray-100/50 rounded-xl inline-block mb-4">
                  <User className="w-12 h-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Student Data Found</h3>
                <p className="text-gray-600">Unable to load student information at this time.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthT>
  );
};

export default StudentDetail;
