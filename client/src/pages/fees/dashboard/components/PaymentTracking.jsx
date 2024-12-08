import React from "react";

const PaymentTracking = () => {
  const payments = [
    { id: 1, student: "John Doe", amount: "$500", date: "2024-12-01", method: "Mobile Money" },
    { id: 2, student: "Jane Smith", amount: "$300", date: "2024-12-03", method: "Bank Transfer" },
  ];

  return (
    <div className="payment-tracking">
      <h3>Payment History</h3>
      <table>
        <th>
          <tr>
            <td>Student</td>
            <td>Amount</td>
            <td>Date</td>
            <td>Payment Method</td>
          </tr>
        </th>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.student}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
              <td>{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTracking;
