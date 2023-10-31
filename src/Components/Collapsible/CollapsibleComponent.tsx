import React, { useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';

export interface CollapsibleComponentProps {
  trigger: React.ReactElement<any>;
  // NOTE: Replaced this with className logic: If element contain `exceptionRef` class click event will be discarded
  // exceptionRef?: React.MutableRefObject<any>;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactElement<any> | any;
  handleTriggerClick?: (e: any) => void;
  isOpen?: boolean;
  tabIndex?: number
}

const CollapsibleComponent = (props: CollapsibleComponentProps) => {
  const { /**exceptionRef,*/ trigger, onOpen, onClose, children = null, handleTriggerClick, isOpen = true , tabIndex = 0} = props;
  const [isCollapseOpen, setIsCollapseOpen] = useState(isOpen);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: isCollapseOpen, defaultExpanded: true });

  useEffect(() => setIsCollapseOpen(isOpen), [isOpen]);

  useEffect(() => {
    if (isCollapseOpen && onOpen) {
      onOpen();
    } else if (!isCollapseOpen && onClose) {
      onClose();
    }
    return () => {};
  }, [isCollapseOpen]);

  return (
    <div className="collapsible">
      <div
        className={`collapsible--trigger ${isCollapseOpen ? 'is-open' : 'is-close'}`}
        {...getToggleProps({
          onClick: (e) => {
            if (handleTriggerClick) {
              handleTriggerClick(e);
            }
            const targetClassName = (e.target && e.target.className && typeof e.target.className === 'string' ? e.target.className : '') || '';
            if (
              // !exceptionRef ||
              // (exceptionRef && !exceptionRef.current) ||
              // (exceptionRef && exceptionRef.current && !exceptionRef.current.contains(e.target))
              targetClassName.indexOf('exceptionRef') === -1
            ) {
              setIsCollapseOpen((oldOpen) => !oldOpen);
            }
          },
          tabIndex: tabIndex
        })}
        onKeyDown={(e)=> {
          if(e?.key === 'Enter') {
              if (handleTriggerClick) {
                handleTriggerClick(e);
              }
              const targetClassName = (e.target && e.target.className && typeof e.target.className === 'string' ? e.target.className : '') || '';
              if (
                // !exceptionRef ||
                // (exceptionRef && !exceptionRef.current) ||
                // (exceptionRef && exceptionRef.current && !exceptionRef.current.contains(e.target))
                targetClassName.indexOf('exceptionRef') === -1
              ) {
                setIsCollapseOpen((oldOpen) => !oldOpen);
              }
            }
          }
        }
      >
        {trigger}
      </div>
      <div className="collapsible--body" {...getCollapseProps()}>
        <div className="collapsible--collapse">
          <div className="collapsible--content">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default CollapsibleComponent;
