const ATMDeposit = ({ onChange, isDeposit, isValid, isMessage }) => {
    const choice = ['Deposit', 'Cash Back'];
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange} placeholder="Enter an amount"></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
        {!isValid && <div>{isMessage}
            </div>}
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [message, setMessage] = React.useState("");
    
  
    let status = `Account Balance $ ${totalState} `;
    const handleChange = (event) => {
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
        setValidTransaction(false);
        setMessage("The current amount exceeds the available balance");
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      setMessage("");
      let inputField = document.getElementById("number-input");
      inputField.value = "";
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      setMessage("");
      setAtmMode(event.target.value);
      setValidTransaction(false);
      if (event.target.value === 'Deposit') {
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      }
    };
  
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <h2 id="total">{status}</h2>
                <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" placeholder="Select an action to continue">
                    <option id="no-selection" value="">Select transaction</option>
                    <option id="deposit-selection" value="Deposit">
                    Deposit
                    </option>
                    <option id="cashback-selection" value="Cash Back">
                    Cash Back
                    </option>
                </select>
                {atmMode && (
                    <ATMDeposit
                    onChange={handleChange}
                    isDeposit={isDeposit}
                    isValid={validTransaction}
                    isMessage={message}
                    ></ATMDeposit>
                )}
            </form>
        </div>
        </>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  