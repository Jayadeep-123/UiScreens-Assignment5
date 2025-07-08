import React, { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import { TextField, ToggleButton, Button, IconButton } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { BsX } from "react-icons/bs";
import { toWords } from 'number-to-words';

// Example fee options, add more if needed
const feeOptions = [
  { label: "Pocket Money", icon: <span>💰</span> },
  { label: "Transport Fee", icon: <span>🚌</span> },
  { label: "Exam Fee", icon: <span>📝</span> },
  { label: "Uniform Fee", icon: <span>👕</span> },
  { label: "Akash Books Fee", icon: <span>📚</span> },
  { label: "Material Fee", icon: <span>📦</span> },
];

const FeeHeadModal = ({ open, onClose, currentFees = [], onConfirm }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(currentFees);
  }, [currentFees]);

  const toggleFee = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1050
      }}
    >
      <div
        style={{
          background: "#fff", borderRadius: "8px", maxWidth: "600px", width: "90%",
          position: "relative", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", padding: "16px"
        }}
      >
        <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
          <div
            style={{
              display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px",
              marginBottom: "12px", padding: "4px 8px", border: "1px solid #dee2e6",
              borderRadius: "4px", minHeight: 48
            }}
          >
            {selected.map((label, idx) => (
              <div
                key={idx}
                style={{
                  display: "inline-flex", alignItems: "center", backgroundColor: "#f0f0f0",
                  borderRadius: "16px", padding: "2px 8px", fontSize: "12px"
                }}
              >
                {label}
                <BsX
                  size={16}
                  style={{ marginLeft: "4px", cursor: "pointer", color: "#18009C" }}
                  onClick={() => toggleFee(label)}
                />
              </div>
            ))}
            <input
              type="text"
              placeholder="Search Fee Head"
              style={{ border: "none", outline: "none", flexGrow: 1, minWidth: 120, background: "transparent" }}
            />
            <Search fontSize="small" style={{ marginLeft: "8px", color: "#6c757d" }} />
          </div>

          <p style={{ color: "red", fontSize: "12px", marginBottom: "12px" }}>
            *Multiple Fee Heads can be selected
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {feeOptions.map((fee, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleFee(fee.label)}
                style={{
                  flex: "1 0 30%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                  border: "1px solid #6c757d",
                  backgroundColor: selected.includes(fee.label) ? "#0d6efd" : "transparent",
                  color: selected.includes(fee.label) ? "#fff" : "#000",
                  borderRadius: "4px", padding: "4px", fontSize: "12px", cursor: "pointer"
                }}
              >
                {fee.icon}
                <span>{fee.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            textAlign: "center", borderTop: "1px solid #dee2e6", paddingTop: "12px",
            marginTop: "12px", backgroundColor: "white"
          }}
        >
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              backgroundColor: "#3425FF", color: "#fff", borderRadius: "4px",
              padding: "6px 12px", fontSize: "14px", border: "none", cursor: "pointer"
            }}
          >
            Add <Add sx={{ fontSize: 16, marginLeft: 4 }} />
          </button>
        </div>

        <IconButton
          onClick={onClose}
          style={{
            position: "absolute", bottom: -65, left: "50%", transform: "translateX(-50%)",
            backgroundColor: "black", color: "white"
          }}
        >
          <BsX size={28} />
        </IconButton>
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const [term, setTerm] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [selectedDate, setSelectedDate] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [selectedFees, setSelectedFees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const paymentModes = ["Cash", "DD", "Cheque", "Credit/Debit Card"];
  const termOptions = ['Term Fee 1', 'Term Fee 2', 'Term Fee 3'];

  const handleFeeConfirm = (fees) => setSelectedFees(fees);

  return (
    <div style={{ display: "flex", flexDirection: "column", marginLeft: "5%", gap: "12px", marginTop: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px" }}>Due Amount</p>
          <span style={{ background: "#E9E9E9", fontSize: "18px", fontWeight: "600", padding: "4px 12px", borderRadius: "4px" }}>
            46,000
          </span>
        </div>
        <div style={{ display: "flex", border: "1px solid #dee2e6", borderRadius: "999px", overflow: "hidden" }}>
          {paymentModes.map((mode) => (
            <div
              key={mode}
              onClick={() => setPaymentMode(mode)}
              style={{
                flex: 1, textAlign: "center", padding: "6px 12px", cursor: "pointer",
                backgroundColor: paymentMode === mode ? "#3C28FF" : "transparent",
                color: paymentMode === mode ? "#FFFFFF" : "#252C32"
              }}
            >
              {mode}
            </div>
          ))}
        </div>
      </div>

      <Formik
        initialValues={{ amount: '', description: '', receiptNo: '' }}
        onSubmit={(values) => {
          console.log('Submitted:', { ...values, selectedFees });
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div style={{ position: "relative", marginLeft: "2%", marginRight: "20%" }}>
              <div style={{ position: "absolute", top: 0, left: 20, transform: "translateY(-50%)", display: "flex", gap: "8px" }}>
                {termOptions.map((val) => (
                  <ToggleButton
                    key={val}
                    value={val}
                    selected={term === val}
                    onChange={() => setTerm(val)}
                    sx={{
                      borderRadius: "23px", px: 2, py: 0.5, fontSize: "12px",
                      border: "1px solid #BFBFBF", backgroundColor: "white",
                      "&.Mui-selected": { bgcolor: "#1E1EFF", color: "#fff" }
                    }}
                  >
                    {val}
                  </ToggleButton>
                ))}
              </div>

              <div style={{ marginTop: "32px", border: "1px solid #E6E6E6", borderRadius: "12px", padding: "32px 16px", backgroundColor: "#FAFAFA" }}>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <TextField
                    name="amount"
                    label="Enter Amount"
                    type="number"
                    variant="outlined"
                    value={values.amount}
                    onChange={(e) => {
                      handleChange(e);
                      setAmountInWords(e.target.value ? toWords(parseInt(e.target.value)) : '');
                    }}
                    onBlur={handleBlur}
                    sx={{ width: "220px", backgroundColor: "#fff" }}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ flex: 2, backgroundColor: "#fff" }}
                  />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                  {selectedFees.map((fee, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "inline-flex", alignItems: "center", backgroundColor: "#f0f0f0",
                        borderRadius: "16px", padding: "2px 8px", fontSize: "12px"
                      }}
                    >
                      {fee}
                      <BsX
                        size={16}
                        style={{ marginLeft: "4px", cursor: "pointer", color: "#18009C" }}
                        onClick={() => setSelectedFees(selectedFees.filter(f => f !== fee))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginLeft: "5%", marginTop: "16px" }}>
              <TextField
                name="receiptNo"
                label="Pre Print Receipt No"
                variant="outlined"
                value={values.receiptNo}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ flex: 1 }}
              />
              <TextField
                type="date"
                variant="outlined"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
              />
            </div>

            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => setModalOpen(true)}
                sx={{
                  backgroundColor: "#B6B1FF", color: "black", fontSize: "12px", fontWeight: 400,
                  textTransform: "capitalize", boxShadow: "none", "&:hover": { boxShadow: "none" }
                }}
              >
                <Add sx={{ fontSize: 16, mr: 1 }} /> Add Fee Head
              </Button>
            </div>

            <FeeHeadModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              currentFees={selectedFees}
              onConfirm={handleFeeConfirm}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
