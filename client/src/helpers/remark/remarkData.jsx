import React, { useState, useEffect } from "react";
import {
  Pencil,
  PencilIcon,
  Plus,
  PlusIcon,
  Trash,
  TrashIcon,
} from "lucide-react";
import api from "../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import JCETable from "./jceTable.jsx";
import JceForm from "./jceForm.jsx";
import FormButton from "../../components/input/formButton.jsx";
import MsceForm from "./msceForm.jsx";
import MSCETable from "./msceTable.jsx";
import {
  setIsEditMode,
  setEditItemId,
  setJCEFormData,
  setMSCEFormData,
} from "../examination/examSlice.jsx";
import Tabs from "../../components/tabs.jsx";

const RemarkData = () => {
  const [selectedTab, setSelectedTab] = useState("JCE");
  const [showJCE, setShowJCE] = useState(false);
  const [showMSCE, setShowMSCE] = useState(false);
  const handleJCEClose = () => {
    setShowJCE(false);
  };
  const handleMSCEClose = () => {
    setShowMSCE(false);
  };
  const handleJCEOpen = () => {
    setShowJCE(true);
  };
  const handleMSCEOpen = () => {
    setShowMSCE(true);
  };
  const [msceData, setMSCEData] = useState([]);

  const dispatch = useDispatch();
  const [jceData, setJCEData] = useState([]);

  // Fetch all the exams
  const fetchJCE = async () => {
    const res = await api.getJCE();
    const data = res.data.jce;
    if (data.length === 0) {
      const jceData = data.map((item, index) => ({
        sr: "",
        denom: "",
        roof: "No records found...",
        floor: "",
        remark: "",
        actions: "",
      }));
      setJCEData(jceData);
    } else {
      const jceData = data.map((item, index) => ({
        sr: index + 1,
        denom: item.denom,
        roof: item.roof,
        floor: item.floor,
        remark: item.remark,
        actions: (
          <div>
            <button onClick={() => handleEdit(item.id)} className="action_icon">
              <Pencil size={15} className="action_edit" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="action_icon"
            >
              <Trash size={15} className="action_delete" />
            </button>
          </div>
        ),
      }));
      setJCEData(jceData);
    }
  };

  useEffect(() => {
    fetchJCE();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get One exam
  const handleEdit = async (id) => {
    setShowJCE(true);
    const res = await api.editJCE(id);
    dispatch(
      setJCEFormData({
        denom: res.data.edit.denom,
        roof: res.data.edit.roof,
        floor: res.data.edit.floor,
        remark: res.data.edit.remark,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteJCE(id);
      if (res.data.success === true) {
        fetchJCE();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getMSCE();
    const data = res.data.msce;
    if (data.length > 0) {
      const msceData = data.map((item, index) => ({
        sr: index + 1,
        denom: item.denom,
        roof: item.roof,
        floor: item.floor,
        remark: item.remark,
        actions: (
          <div>
            <button
              onClick={() => handleEditr(item.id)}
              className="action_icon"
            >
              <PencilIcon size={15} color="green" />
            </button>
            <button
              onClick={() => handleDeleter(item.id)}
              className="ml-3"
            >
              <TrashIcon size={15} color="red" />
            </button>
          </div>
        ),
      }));
      setMSCEData(msceData);
    } else {
      const msceData = data.map((item, index) => ({
        sr: "",
        denom: "",
        roof: "",
        floor: "",
        remark: "No records found...",
        actions: "",
      }));
      setMSCEData(msceData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get One exam
  const handleEditr = async (id) => {
    setShowMSCE(true);
    const res = await api.editMSCE(id);
    dispatch(
      setMSCEFormData({
        denom: res.data.edit.denom,
        roof: res.data.edit.roof,
        floor: res.data.edit.floor,
        remark: res.data.edit.remark,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };

  //   Handle Delete
  const handleDeleter = async (id) => {
    try {
      const res = await api.deleteMSCE(id);
      if (res.data.success === true) {
        fetchData();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={["JCE", "MSCE"]}
      />
      {selectedTab === "JCE" && (
        <div className="mt-4">
          <div
            className="div mt-4"
            style={{ display: showJCE ? "none" : "block" }}
          >
            <button
              type="button"
              onClick={handleJCEOpen}
              className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md"
            >
              <Plus size={15} className="plus" />
              Add
            </button>
          </div>
          <div
            className="toggleDiv"
            style={{ display: showJCE ? "block" : "none" }}
          >
            <JceForm fetchJCE={fetchJCE} />
            <FormButton
              label={"Close"}
              id={"closeBtn"}
              onClick={handleJCEClose}
            />
          </div>
          <JCETable setShowJCE={setShowJCE} jceData={jceData} />
        </div>
      )}
      {selectedTab === "MSCE" && (
        <div className="mt-4">
          <div
            className="div mt-4"
            style={{ display: showMSCE ? "none" : "block" }}
          >
            <button
              type="button"
              onClick={handleMSCEOpen}
              className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md"
            >
              <PlusIcon size={15} className="plus" />
              Add
            </button>
          </div>
          <div
            className="toggleDiv"
            style={{ display: showMSCE ? "block" : "none" }}
          >
            <MsceForm fetchData={fetchData} />
            <FormButton
              label={"Close"}
              id={"closeBtn"}
              onClick={handleMSCEClose}
            />
          </div>
          <MSCETable setShowMSCE={setShowMSCE} msceData={msceData} />
        </div>
      )}
    </>
  );
};

export default RemarkData;
