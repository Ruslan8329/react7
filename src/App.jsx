import { useState } from "react";
import "./App.css";
import FeedbackWidget from "./components/FeedbackWidget";
import ContactBook from "./components/ContactBook";
import ImageSearchApp from "./components/ImageSearchApp";

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("feedback");

  const renderComponent = () => {
    switch (currentComponent) {
      case "feedback":
        return <FeedbackWidget />;
      case "contacts":
        return <ContactBook />;
      case "search":
        return <ImageSearchApp />;
      default:
        return <FeedbackWidget />;
    }
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentComponent("feedback")}>
          Feedback Widget
        </button>
        <button onClick={() => setCurrentComponent("contacts")}>
          Contact Book
        </button>
        <button onClick={() => setCurrentComponent("search")}>
          Image Search
        </button>
      </nav>
      {renderComponent()}
    </div>
  );
};

export default App;
