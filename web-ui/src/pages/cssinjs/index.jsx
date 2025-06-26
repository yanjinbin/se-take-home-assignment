import styled from "styled-components";

export default function Cssinjs() {
	// 模板字符串标签函数

	const MyButton = styled.button`
  color: white;
  padding: 10px 20px;
  background-color: ${(props) => (props.primary ? "blue" : "gray")};

  border-radius: 5px;
  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
    background-color: green;
  }
  &:hover {
    background-color: ${(props) => (props.primary ? "darkblue" : "darkgray")};
  }
`;

	const MyCard = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .header {
    font-size: 20px;
    font-weight: bold;
  }

  .body {
    margin-top: 10px;
    font-size: 16px;
  }
`;

	const Btn = styled.button`
  background: blue;
  color: white;
`;

	const DangerBtn = styled(Btn)`
  background: red;
`;

	return (
		<>
			<MyButton>点击我</MyButton>
			<MyButton primary>Primary Button</MyButton>
			<MyButton>Secondary Button</MyButton>
			<MyCard>
				<div className="header">Card Title</div>
				<div className="body">This is some content inside the card.</div>
			</MyCard>
			<Btn>btn</Btn>
			<DangerBtn>danger</DangerBtn>
		</>
	);
}
