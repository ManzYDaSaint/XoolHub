import React, { useState } from "react";
import AuthT from "../../hooks/tauth";
import NavBar from "../components/navbar";
import { Toaster } from "react-hot-toast";
import EntryData from "../data/entryData";
import FilterData from "../data/filterData";
import { Icon } from "semantic-ui-react";

const Entry = () => {
  const handleXClose = () => {
    setShowX(false);
  };
  const handleXOpen = () => {
    setShowX(true);
  };
  const [showX, setShowX] = useState(false);
  const handleEntryClose = () => {
    setShowEntry(false);
  };
  const handleEntryOpen = () => {
    setShowEntry(true);
  };
  const [showEntry, setShowEntry] = useState(false);

  return (
    <AuthT>
      <div className="dashboard__container">
        <Toaster />
        <div className="dashboard__content">
          <NavBar />
          <div className="dashboard">
            <div className="settingContainer mt-0">
              <div className="settingContent">
                <div className="student_container">
                  <div className="splitter">
                    <div className="headerTitle">
                      <h5>Examination Management</h5>
                    </div>
                  </div>
                  <p>
                        This page manages examination to be added into the
                        system. <br />
                        Filter with specified options below to prepare for
                        entry. You can view, export and edit scores for a
                        specific student.
                      </p>
                  <div className="entrySplitter">
                    <div
                      className="div"
                      style={{
                        display: showEntry ? "none" : "block",
                        marginRight: "2rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleEntryOpen();
                          handleXClose();
                        }}
                        style={{ width: "100%" }}
                        class="add__rows__btn"
                      >
                        <Icon name="plus" className="plus" />
                        Add
                      </button>
                    </div>
                    <div
                      className="div"
                      style={{
                        display: showX ? "none" : "block",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleXOpen();
                          handleEntryClose();
                        }}
                        style={{ width: "100%" }}
                        class="add__rows__btn"
                      >
                        <Icon name="filter" className="filter" />
                        Filter
                      </button>
                    </div>
                  </div>
                  <EntryData
                    showEntry={showEntry}
                    handleEntryClose={handleEntryClose}
                  />
                  <FilterData showX={showX} handleXClose={handleXClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthT>
  );
};

export default Entry;
