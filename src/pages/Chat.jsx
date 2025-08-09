import { useParams } from "react-router-dom";

export default function Chat() {
    
    const { id } = useParams();

    console.log("Chat component rendered");
    console.log(id);

    return (
        <div>
            <h1>Chat {id}</h1>
        </div>
    );
}