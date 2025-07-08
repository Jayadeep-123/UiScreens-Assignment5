import React, { useState, useEffect } from "react";
import { DialogContent, IconButton, Chip } from "@mui/material";
import { Search } from "@mui/icons-material";
import { BsX } from "react-icons/bs";
 
const feeOptions = [
  {
    label: "Pocket Money",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6 0a.5.5 0 0 1 .5.5V1h3V.5a.5.5 0 0 1 1 0V1h.5A1.5 1.5 0 0 1 12.5 2.5v11A1.5 1.5 0 0 1 11 15H5a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 5 1h.5V.5A.5.5 0 0 1 6 0zm1 3a.5.5 0 0 0-1 0v1H5a.5.5 0 0 0 0 1h1v1H5a.5.5 0 0 0 0 1h1v1h1v-1h1a.5.5 0 0 0 0-1H7V5h1a.5.5 0 0 0 0-1H7V3z" />
      </svg>
    ),
  },
  {
    label: "Transport Fee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12 2a1 1 0 0 1 1 1v7H3V3a1 1 0 0 1 1-1h8zM2 3v8a1 1 0 0 0 1 1h1a2 2 0 1 0 4 0h2a2 2 0 1 0 4 0h1a1 1 0 0 0 1-1V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      </svg>
    ),
  },
  {
    label: "Exam Fee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.5 1a.5.5 0 0 1 .5.5V3h4V1.5a.5.5 0 0 1 1 0V3h.5A1.5 1.5 0 0 1 13 4.5v9A1.5 1.5 0 0 1 11.5 15h-7A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3H5V1.5a.5.5 0 0 1 .5-.5z" />
      </svg>
    ),
  },
  {
    label: "Uniform Fee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V4H2.5A1.5 1.5 0 0 0 1 5.5V14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5A1.5 1.5 0 0 0 13.5 4H13V2.5A1.5 1.5 0 0 0 11.5 1h-7z" />
      </svg>
    ),
  },
  {
    label: "Akash Books Fee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1H2V2zm0 2h12v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" />
      </svg>
    ),
  },
  {
    label: "Material Fee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1 2.828c.885-.37 2.154-.828 4-.828 2.5 0 4 .5 6 .5s3.5-.5 4-.5v10c-.5 0-2 .5-4 .5s-3.5-.5-6-.5-3.115.457-4 .828V2.828z" />
      </svg>
    ),
  },
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
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.42)",
        backdropFilter: "blur(10.75px)",
        zIndex: 1050,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          width: "495px",
          height: "65%",
          maxWidth: "95%",
          position: "relative",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <DialogContent style={{ padding: "1rem", paddingBottom: 0, flex: 1, overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "12px",
              padding: "6px 10px",
              border: "1px solid rgba(181, 181, 181, 0.44)",
              borderRadius: "5px",
              background: "#FFF",
              boxShadow: "inset 3px 4px 8.9px rgba(0, 0, 0, 0.25)",
              minHeight: "48px",
            }}
          >
            {selected.map((label, idx) => (
              <Chip
                key={idx}
                label={label}
                onDelete={() => toggleFee(label)}
                deleteIcon={<BsX size={16} style={{ color: "#18009C" }} />}
                style={{
                  borderRadius: "4px",
                  border: "1px solid #18009C",
                  background: "#D8E2FF",
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: "5px 8px 6px 14px",
                }}
              />
            ))}
            <input
              type="text"
              placeholder="Search Fee Head"
              style={{
                flexGrow: 1,
                minWidth: 120,
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            />
            <Search fontSize="small" style={{ marginLeft: "6px", color: "#6c757d" }} />
          </div>
 
          <p style={{ color: "red", fontSize: "12px", marginBottom: "12px" }}>
            *Multiple Fee Heads can be selected
          </p>
 
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {feeOptions.map((fee, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleFee(fee.label)}
                style={{
                  flex: "1 0 30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  border: "1px solid #6c757d",
                  backgroundColor: selected.includes(fee.label) ? "#3425FF" : "#fff",
                  color: selected.includes(fee.label) ? "#fff" : "#000",
                  borderRadius: "6px",
                  padding: "6px 4px",
                  fontSize: "12px",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                {fee.icon}
                <span style={{ whiteSpace: "nowrap" }}>{fee.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
 
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #dee2e6",
            paddingTop: "12px",
            paddingBottom: "12px",
            backgroundColor: "#fff",
          }}
        >
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              backgroundColor: "#3425FF",
              color: "#fff",
              borderRadius: "4px",
              padding: "6px 16px",
              fontSize: "14px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Add&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M10.8337 4.99996C10.8337 4.77895 10.7459 4.56698 10.5896 4.4107C10.4333 4.25442 10.2213 4.16663 10.0003 4.16663C9.77931 4.16663 9.56735 4.25442 9.41107 4.4107C9.25479 4.56698 9.16699 4.77895 9.16699 4.99996V9.16663H5.00033C4.77931 9.16663 4.56735 9.25442 4.41107 9.4107C4.25479 9.56698 4.16699 9.77895 4.16699 9.99996C4.16699 10.221 4.25479 10.4329 4.41107 10.5892C4.56735 10.7455 4.77931 10.8333 5.00033 10.8333H9.16699V15C9.16699 15.221 9.25479 15.4329 9.41107 15.5892C9.56735 15.7455 9.77931 15.8333 10.0003 15.8333C10.2213 15.8333 10.4333 15.7455 10.5896 15.5892C10.7459 15.4329 10.8337 15.221 10.8337 15V10.8333H15.0003C15.2213 10.8333 15.4333 10.7455 15.5896 10.5892C15.7459 10.4329 15.8337 10.221 15.8337 9.99996C15.8337 9.77895 15.7459 9.56698 15.5896 9.4107C15.4333 9.25442 15.2213 9.16663 15.0003 9.16663H10.8337V4.99996Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
 
        <IconButton
          onClick={onClose}
          style={{
            position: "absolute",
            bottom: -65,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <BsX size={28} />
        </IconButton>
      </div>
    </div>
  );
};
 
export default FeeHeadModal;