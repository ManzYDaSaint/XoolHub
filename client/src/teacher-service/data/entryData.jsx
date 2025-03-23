import React from "react";
import EntryForm from "../form/entryForm";
import FormButton from "../../components/input/formButton";

const EntryData = ({ showEntry, handleEntryClose }) => {
  return (
    <>
      <div
        className="toggleDiv"
        style={{ display: showEntry ? "block" : "none" }}
      >
        <EntryForm />
        <FormButton
          label={"Close"}
          id={"closeBtn"}
          onClick={handleEntryClose}
        />
      </div>
    </>
  );
};

export default EntryData;
