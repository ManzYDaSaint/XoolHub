import React from "react";
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import api from "../../../services/apiServices";
import toast from "react-hot-toast";

function DeleteModal({ open, setOpen, reportFormData }) {
  const handleDelete = async (data) => {
    try {
      const res = await api.deleteReport({ data });
      console.log(res);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    finally {
      setOpen(false);
    }
  };

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      centered={true}
    >
      <Header icon className="hov">
        <Icon name="trash alternate outline" />
        Delete Report
      </Header>
      <ModalContent>
        <p>
          Are you sure want to delete this data? <br /> This action is irreversible
        </p>
      </ModalContent>
      <ModalActions>
        <Button basic color="green" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="red"
          inverted
          onClick={() => handleDelete(reportFormData)}
        >
          <Icon name="check" /> Delete
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default DeleteModal;
