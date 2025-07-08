import { useState } from 'react';

const tabs = [
  'Payments',
  'Cancellation',
  'Concession',
  'PM Issue',
  'Fee Installments',
  'Refunds',
  'Akash Books',
  'Uniform',
  'Transfers'
 
];

const InnerTabNav = () => {
  const [activeTab, setActiveTab] = useState('Payments');

  return (
    <div
      className="d-flex w-100 border-bottom mb-3"
      style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',       // Firefox
        msOverflowStyle: 'none'       // IE/Edge
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          paddingBottom: '2px'        // space below tabs
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#3B49DF' : '#6c757d',
              borderBottom: activeTab === tab ? '2px solid #3B49DF' : '2px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Hide scrollbar in Chrome/Safari/Edge */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InnerTabNav;
