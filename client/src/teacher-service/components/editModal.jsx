import React, { useState } from 'react'
import {
  ModalContent,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react'
import { setEditItemId, setScoreFormData } from '../../helpers/examination/examSlice.jsx';
import { useSelector, useDispatch } from 'react-redux';
import FormInput from '../../components/input/formInput.jsx';
import FormButton from '../../components/input/formButton.jsx';
import { InfinitySpin } from 'react-loader-spinner';
import api from '../../services/apiServices'
import toast from 'react-hot-toast';

function EditModal({ open, setOpen, classID }) {
    const dispatch = useDispatch();
    const editItemId = useSelector((state) => state.exam.editItemId);
    const scoreFormData = useSelector((state) => state.exam.scoreFormData);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(data) => {
        try {
            const res = await api.updateScore(editItemId, {classID, data});
            if (res.data.success === true) {
              toast.success(res.data.message);
              setOpen(false);
            } 
            else {
              toast.error(res.data.message);
            }
          } catch (error) {
            toast.error('An error occurred. Please try again.');
          }
          finally {
            setLoading(false);
          }
        dispatch(setScoreFormData({
          score: '',
        }));
        dispatch(setEditItemId(null));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setScoreFormData({
            ...scoreFormData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit(scoreFormData);
      };

  return (
        <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        centered={true}
        >
        <Header icon className='hov'>
            <Icon name='redo' />
            Update Score
        </Header>
        <ModalContent className='customModalForm'>
            <form onSubmit={onSubmit} autoComplete='off'>
                <div className='formGroup'>
                    <FormInput
                    label={'Score'}
                    type={'text'}
                    name='score'
                    value={scoreFormData.score}
                    onChange={handleChange}
                    placeholder={'Type here...'}
                    />
                </div>
                <FormButton label={loading ? 'Processing..' : 'Update Score'} id="tyepButton" />
            </form>
            {loading && (
              <div className='loki'>
                <InfinitySpin width='200' color="#007BFE" />
              </div>
            )}
        </ModalContent>
        </Modal>
  )
}

export default EditModal