import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import costvalues from "./costsheetparticulars";
import Form from "react-bootstrap/Form";
import styles from "./CostSheet.module.css";
const CostSheetTable = React.forwardRef((props, ref) => {
  const [state, setstate] = useState(false);
  return (
    <div className="table-responsive" id="costsheet_table" ref={ref}>
      <h3 style={{ color: "red" }}>Fixed Expenses</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className={styles.costsheet__tableheading}>Particulars</th>
            <th className={styles.costsheet__tableheading}>Budgeted Cost</th>
            <th className={styles.costsheet__tableheading}>Actual Cost</th>
            <th className={styles.costsheet__tableheading}>Variant Cost</th>
          </tr>
        </thead>
        <tbody>
          {costvalues.particulars.map((cost, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cost}</td>
                <td>
                  <InputGroup>
                    <InputGroup.Text>&#8377;</InputGroup.Text>
                    <Form.Control
                      type="Number"
                      value={props.inputValues[cost].budgetedAmount}
                      onChange={(e) => {
                        props.inputValues[cost].budgetedAmount =
                          e.target.value != "" ? parseInt(e.target.value) : "";

                        if (
                          props.inputValues[cost].actualAmount != "" &&
                          props.inputValues[cost].budgetedAmount != ""
                        ) {
                          props.inputValues[cost].variantAmount =
                            props.inputValues[cost].actualAmount -
                            props.inputValues[cost].budgetedAmount;
                        }
                        setstate(!state);
                      }}
                    />
                  </InputGroup>
                </td>
                <td>
                  <InputGroup>
                    <InputGroup.Text>&#8377;</InputGroup.Text>
                    <Form.Control
                      type="Number"
                      value={props.inputValues[cost].actualAmount}
                      onChange={(e) => {
                        props.inputValues[cost].actualAmount =
                          e.target.value != "" ? parseInt(e.target.value) : "";

                        if (
                          props.inputValues[cost].actualAmount != "" &&
                          props.inputValues[cost].budgetedAmount != ""
                        ) {
                          props.inputValues[cost].variantAmount =
                            props.inputValues[cost].actualAmount -
                            props.inputValues[cost].budgetedAmount;
                        }
                        setstate(!state);
                      }}
                    />
                  </InputGroup>
                </td>
                <td>
                  <InputGroup>
                    <InputGroup.Text>&#8377;</InputGroup.Text>
                    <Form.Control
                      type="Number"
                      value={props.inputValues[cost].variantAmount}
                      disabled
                    />
                  </InputGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h3 style={{ color: "red" }}>Miscellanous Expenses</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className={styles.costsheet__tableheading}>Particulars</th>
            <th className={styles.costsheet__tableheading}>Budgeted Cost</th>
            <th className={styles.costsheet__tableheading}>Actual Cost</th>
            <th className={styles.costsheet__tableheading}>Variant Cost</th>
          </tr>
        </thead>
        <tbody>
          {costvalues.miscellanousexpenses.map((cost, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cost}</td>
              <td>
                <InputGroup>
                  <InputGroup.Text>&#8377;</InputGroup.Text>
                  <Form.Control
                    type="Number"
                    defaultValue={
                      props.miscellanousexpensesValues[cost].budgetedAmount
                    }
                    onChange={(e) =>
                      (props.miscellanousexpensesValues[cost].budgetedAmount =
                        e.target.value)
                    }
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <InputGroup.Text>&#8377;</InputGroup.Text>
                  <Form.Control
                    type="Number"
                    defaultValue={
                      props.miscellanousexpensesValues[cost].actualAmount
                    }
                    onChange={(e) =>
                      (props.miscellanousexpensesValues[cost].actualAmount =
                        e.target.value)
                    }
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <InputGroup.Text>&#8377;</InputGroup.Text>
                  <Form.Control
                    type="Number"
                    onChange={(e) =>
                      (props.miscellanousexpensesValues[cost].variantAmount =
                        e.target.value)
                    }
                    disabled
                  />
                </InputGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});
export default CostSheetTable;
