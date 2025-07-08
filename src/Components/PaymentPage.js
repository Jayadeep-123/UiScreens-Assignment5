import React, { useState } from "react";
import { Formik, Form } from 'formik';
import { Add } from '@mui/icons-material';
import FeeHeadModal from '../Components/FeeHeadModal';
import { toWords } from 'number-to-words';

const PaymentForm = () => {
  const [term, setTerm] = useState('Term Fee 1');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFees, setSelectedFees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const paymentModes = ["Cash", "DD", "Cheque", "Credit/Debit Card"];
  const termOptions = ['Term Fee 1', 'Term Fee 2', 'Term Fee 3'];

  const handleFeeConfirm = (fees) => {
    const updatedFees = fees.map(fee => ({
      label: fee,
      amount: '',
      description: '',
      amountInWords: ''
    }));
    setSelectedFees(updatedFees);
  };

  const updateFee = (index, field, value) => {
    const updated = [...selectedFees];
    updated[index][field] = value;
    if (field === 'amount') {
      updated[index].amountInWords = value ? toWords(parseInt(value)) : '';
    }
    setSelectedFees(updated);
  };

  const removeFee = (index) => {
    const updated = [...selectedFees];
    updated.splice(index, 1);
    setSelectedFees(updated);
  };

  return (
    <div
      className="m-4"
      style={{
        fontFamily: 'Inter, sans-serif',
        height: 'calc(100vh - 32px)', // viewport height minus margins
        overflowY: 'auto', // enable vertical scroll
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="mb-1" style={{ fontSize: 12 }}>Due Amount</p>
          <div className="fw-bold px-3 py-1 rounded" style={{ fontSize: 22, background: '#F2F2F2' }}>
            46,000
          </div>
        </div>
        <div className="d-flex border rounded-pill overflow-hidden" style={{ marginRight: '35%' }}>
          {paymentModes.map((mode) => (
            <div
              key={mode}
              onClick={() => setPaymentMode(mode)}
              className="px-3 py-1"
              style={{
                cursor: 'pointer',
                backgroundColor: paymentMode === mode ? '#3C28FF' : 'transparent',
                color: paymentMode === mode ? '#fff' : '#252C32',
                fontSize: 13,
                fontWeight: 500
              }}
            >
              {mode}
            </div>
          ))}
        </div>
      </div>

      <Formik
        initialValues={{ amount: '', description: '', receiptNo: '' }}
        onSubmit={(values) => console.log('Submitted:', { ...values, selectedFees })}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form style={{ height: 'auto' }}>
            {/* Term Fee Tabs & Inputs */}
            <div className="bg-light border rounded p-3 mb-3 position-relative mt-5" style={{ marginRight: '5%' }}>
              <div className="position-absolute d-flex gap-2" style={{ top: '-14px', left: '12px' }}>
                {termOptions.map(val => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setTerm(val)}
                    className={`btn btn-sm rounded-pill ${term === val ? 'text-white' : 'btn-outline-secondary'}`}
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      backgroundColor: term === val ? '#3C28FF' : 'transparent',
                      border: term === val ? 'none' : ''
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="d-flex gap-2 mt-2">
                <input
                  name="amount"
                  type="number"
                  className="form-control"
                  placeholder="Enter Amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ maxWidth: '200px', background: '#fff' }}
                />
                <input
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ background: '#fff' }}
                />
              </div>
              <p className="small mt-1" style={{ color: 'orangered', fontSize: '12px' }}>
                * Amount in words will display here
              </p>
            </div>

            {/* Dynamic Fee Heads */}
            {selectedFees.map((fee, idx) => (
              <div key={idx} className="position-relative bg-white border rounded p-3 mb-3" style={{ marginRight: '5%' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    backgroundColor: '#3C28FF',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 500,
                    borderRadius: '20px',
                    padding: '2px 12px'
                  }}>
                  {fee.label}
                </div>
                <button
                  type="button"
                  onClick={() => updateFee(idx, 'amount', '')}
                  className="btn btn-warning btn-sm position-absolute  "
                  style={{top:'-12px', right: '48px', fontSize: '12px', borderRadius: '12px' }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => removeFee(idx)}
                  className="btn btn-danger btn-sm position-absolute d-flex align-items-center justify-content-center "
                  style={{top:'-12px', right: '10px', width: '22px', height: '22px', borderRadius: '50%', fontSize: '14px', padding: 0 }}
                >
                  ×
                </button>
                <div className="d-flex gap-2 mt-3">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="form-control"
                    value={fee.amount}
                    onChange={(e) => updateFee(idx, 'amount', e.target.value)}
                    style={{ maxWidth: '200px', background: '#fff' }}
                  />
                  <input
                    placeholder="Description"
                    className="form-control"
                    value={fee.description}
                    onChange={(e) => updateFee(idx, 'description', e.target.value)}
                    style={{ background: '#fff' }}
                  />
                </div>
                <p className="text-danger small mt-1">* Amount in words: <strong>{fee.amountInWords}</strong></p>
              </div>
            ))}

            {/* Receipt No & Date */}
            <div className="d-flex gap-2 mb-3 ms-2" style={{ marginRight: '5%' }}>
              <input
                name="receiptNo"
                placeholder="Pre Print Receipt No"
                className="form-control flex-grow-0"
                value={values.receiptNo}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ fontSize: '14px', width: '18%', height: '38px', borderRadius: '8px' }}
              />
              <input
                type="date"
                className="form-control flex-grow-0"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ fontSize: '14px', width: '18%', height: '38px', borderRadius: '8px' }}
              />
            </div>

            {/* Add Fee Head */}
            <div className="text-center mb-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn"
                style={{ backgroundColor: '#B6B1FF', color: 'black', borderRadius: '8px', fontSize: '14px', padding: '6px 24px',width:'25%' }}
              >
                <Add style={{ fontSize: 16, marginRight: 4 }} /> Add Fee Head
              </button>
            </div>

            {/* Submit */}
            <div className="text-center mt-5 ">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: '#3425FF', color: '#fff', borderRadius: '6px', fontSize: '14px', padding: '6px 32px' }}
              >
                Confirm →
              </button>
            </div>

            {/* Modal */}
              <FeeHeadModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                currentFees={selectedFees.map(f => f.label)}
                onConfirm={handleFeeConfirm}
              />
            </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
