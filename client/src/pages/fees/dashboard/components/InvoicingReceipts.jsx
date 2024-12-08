import React from "react";

const InvoicingReceipts = () => {
  const generateInvoice = () => {
    console.log("Invoice Generated");
    // Trigger backend invoice generation
  };

  const generateReceipt = () => {
    console.log("Receipt Generated");
    // Trigger backend receipt generation
  };

  return (
    <div className="invoicing-receipts">
      <h3>Invoicing & Receipts</h3>
      <input type="text" label="Student Name/ID" fullWidth margin="normal" />
      <button variant="contained" color="primary" onClick={generateInvoice}>
        Generate Invoice
      </button>
      <button variant="outlined" color="secondary" onClick={generateReceipt} style={{ marginLeft: 10 }}>
        Generate Receipt
      </button>
    </div>
  );
};

export default InvoicingReceipts;
