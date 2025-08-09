import "./ChatBubble.css";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function ChatBubble({ message, sender }) {
    return (
        <div className={`chat-bubble ${sender}`}>
            {message.split(/(\$\$.*?\$\$|\$.*?\$)/g).map((part, index) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    return <BlockMath key={index} math={part.slice(2, -2)} />;
                } else if (part.startsWith('$') && part.endsWith('$')) {
                    return <InlineMath key={index} math={part.slice(1, -1)} />;
                } else {
                    return <span key={index}>{part}</span>;
                }
            })}
        </div>
    );
}
