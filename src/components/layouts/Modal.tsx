import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import '../../styles/components/modal.scss';
import { closeModal } from '../../store/modalSlice';
import DetailMovie from './DetailMovie';

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const { type, isOpen } = useSelector((state: RootState) => state.modal);

  const closeModalHandle = () => {
    dispatch(closeModal());
  }

  return (
    <> {
        isOpen && (
          <div id="myModal" className="modal-custom animated fadeInDown">
              <div className={`modal-content ${type !== "small" ? 'mt-besar' : 'mt-kecil'}`}>
                  <div className={`modal-card ${type !== "small" ? 'besar-modal' : 'kecil-modal'}`}>
                    <div className="modal-card-kecil__body">
                        <div className="close-wrap flex justify-end">
                            <div onClick={closeModalHandle} className="close">&times;</div>
                        </div>
                        { type === "big" &&
                          <div className="besar-modal__wrap">
                            <div className="besar-modal__title"></div>
                            <DetailMovie />
                            <div className="besar-modal__title"></div>
                            <div className="flex justify-end">
                                <button onClick={closeModalHandle} className="cursor-pointer px-6 py-2 bg-red-700 text-white">Close</button>
                            </div>
                          </div>
                        }

                        {/* { type === "small" &&
                          <>
                            <div>Logout ??</div>
                            <div className="wrap-button flex justify-end">
                                <button onClick={onLogout} className="pointer button-custom">Yes</button>
                            </div>
                          </>
                        } */}
                    </div>
                </div>
              </div>
          </div>
        )
      }
    </>
  )
}
