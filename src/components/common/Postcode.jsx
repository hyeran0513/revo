import DaumPostcode from "react-daum-postcode";

const Postcode = ({ onComplete }) => {
  const handleComplete = (data) => {
    onComplete(data);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default Postcode;
