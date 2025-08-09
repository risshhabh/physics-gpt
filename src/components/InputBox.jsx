
import { useState } from 'react';
import { Plus, GraduationCap, ArrowRight } from 'lucide-react';
import "./InputBox.css";

export default function InputBox() {

    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Input submitted:", inputValue);
        setInputValue("");
    };

    // textarea auto-resize logic
    const maxRows = 5;
    const handleInput = (event) => {
        const textarea = event.target;
        textarea.style.height = "auto";

        // calculate the maximum height allowed
        const computed = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(computed.lineHeight) || 20;
        const maxHeight = lineHeight * maxRows;
        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        if (textarea.scrollHeight > maxHeight) {
            textarea.style.overflowY = "auto";
        } else {
            textarea.style.overflowY = "hidden";
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div className="input-container">
            <div className="input-box">
                <div className="input-area">
                    <textarea
                        rows={1}
                        value={inputValue}
                        onChange={handleChange}
                        onInput={handleInput}
                        placeholder="Ask anything"
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="input-buttons">
                    <div className="left-buttons">
                        <button type="button" className="add-btn"><Plus size={20} /></button>
                        <button type="button" className="mode-btn"><GraduationCap size={20} style={{marginRight: 4}} />Teaching Mode</button>
                    </div>
                    <button type="submit" className="send-btn" onClick={handleSubmit}><ArrowRight size={20} /></button>

                </div>
            </div>
        </div>
    );
}