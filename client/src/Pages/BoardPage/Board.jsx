import BoardList from "./BoradList";
import Write from "./Write";
import Navbar from "../../Components/Common/Navbar";

export default function Board() {

    return (
        <div>
            <Navbar />
            <BoardList />
            <Write />
        </div>
    );
};
