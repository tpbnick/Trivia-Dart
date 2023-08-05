import "./App.css";
import Trivia from "./components/Trivia";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";

setupIonicReact();

function App() {
	return (
		<div>
			<Trivia />
		</div>
	);
}

export default App;
