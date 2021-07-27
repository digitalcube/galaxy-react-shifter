import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { ModalBody } from './ModalBody';
import { ModalContext } from './ModalContext';
import { ModalHeader } from './ModalHeader';

export type ModalProps = PropsWithChildren<{
  id?: string;
  className?: string;
  open?: boolean;
  size?: 'normal' | 'small';
  rounded?: boolean;
  title?: ReactNode;
  dismiss?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}>;
export const Modal: FC<ModalProps> = ({
  id,
  className,
  open,
  children,
  size,
  rounded,
  title,
  dismiss = false,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open, setIsOpen]);

  const isOpenHandler = useCallback(
    (flag: boolean, force?: boolean) => {
      if (!dismiss && !force) return;
      setIsOpen(flag);
    },
    [dismiss]
  );

  const modalClassName = useMemo(() => {
    const items = ['modal', className];
    if (isOpen) {
      items.push('show');
      items.push('d-block');
    }
    if (size === 'small') items.push('smaller');
    return items.filter(Boolean).join(' ');
  }, [className, isOpen, size]);
  if (!isOpen) return null;
  return (
    <ModalContext.Provider
      value={{
        open: isOpen,
        isOpen: isOpenHandler,
        dismiss,
      }}
    >
      <div
        className={modalClassName}
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-label"
        aria-hidden="false"
        aria-modal="true"
        onClick={() => isOpenHandler(false)}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`modal-content ${rounded ? ' rounded' : ''}`}>
            {title ? (
              <ModalHeader closeIcon={dismiss}>{title}</ModalHeader>
            ) : null}
            {children ? (
              <ModalBody onSubmit={onSubmit}>{children}</ModalBody>
            ) : null}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </ModalContext.Provider>
  );
};
