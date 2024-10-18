import '../../styles/components/modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { closeModal } from '../../store/modalSlice';
import DetailMovie from '../DetailMovie';
import { sizeModal, typeModal } from '../../utilities/constant';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../pages/login/FormLogin';
import { deleteSessionId } from '../../store/userSlice';
import Cookies from 'js-cookie';

interface ButtonCloseProps {
  closeModalHandle: () => void;
  back: () => void,
  type: string
}

const ButtonClose = ({ closeModalHandle, back, type }: ButtonCloseProps) => {
  return (
    <>
      <div className="besar-modal__title"></div>
      <div className="flex justify-end">
          <button onClick={type === typeModal.LOGIN ? () => back() : () => { closeModalHandle() }} className="cursor-pointer px-6 py-2 bg-red-700 text-white">Close</button>
      </div>
    </>
  )
}

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const { type, isOpen, size } = useSelector((state: RootState) => state.modal);
  const navigate = useNavigate();

  const closeModalHandle = () => {
    dispatch(closeModal());
  }

  const back = () => {
    navigate(-1);
    closeModalHandle();
  }

  const handleLogout = () => {
    dispatch(closeModal());
    dispatch(deleteSessionId());
    Cookies.remove('session_id');
    sessionStorage.removeItem('name');
  }

  return (
    <> {
        isOpen && (
          <div id="myModal" className="modal-custom">
              <div className={`modal-content ${size !== sizeModal.SMALL ? 'mt-besar' : 'mt-kecil'}`}>
                  <div className={`modal-card rounded-none lg:rounded-xl ${size !== sizeModal.SMALL ? 'besar-modal' : 'kecil-modal'}`}>
                    <div className="modal-card-kecil__body">
                        <div className="close-wrap flex justify-end">
                          <div onClick={typeModal.LOGIN === type ?  () => back() : () => {closeModalHandle() }} className="close">&times;</div>
                        </div>
                        { type === typeModal.MOVIE && size === sizeModal.BIG &&
                          <div className="besar-modal__wrap">
                            <div className="besar-modal__title"></div>
                              <DetailMovie />
                            <ButtonClose type={type} back={back}closeModalHandle={closeModalHandle} />
                          </div>
                        }

                        { type === typeModal.LOGIN && size === sizeModal.BIG &&
                          <div className="besar-modal__wrap">
                            <div className="besar-modal__title"></div>
                              <FormLogin />
                            <ButtonClose type={type} back={back}closeModalHandle={closeModalHandle} />
                          </div>
                        }

                        { type === typeModal.LOGOUT && sizeModal.SMALL &&
                          <>
                            <div>Logout ??</div>
                            <div className="wrap-button flex justify-end">
                                <button onClick={handleLogout} className="pointer px-6 py-1 bg-red-700 text-white rounded-none">Yes</button>
                            </div>
                          </>
                        }
                    </div>
                </div>
              </div>
          </div>
        )
      }
    </>
  )
}
